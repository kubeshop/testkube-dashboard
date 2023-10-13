import {FC, PropsWithChildren, createElement} from 'react';

import type {GetPluginState, Plugin} from './internal/Plugin';
import {PluginLocalProvider} from './internal/PluginLocalProvider';
import {PluginScope} from './internal/PluginScope';
import {PluginScopeProvider} from './internal/PluginScopeProvider';
import {detectCircularDependencies} from './internal/detectCircularDependencies';
import {detectDirectDependencies} from './internal/detectDirectDependencies';
import {detectResources} from './internal/detectResources';
import {PluginDetails, PluginInit, PluginScopeDisableNewSync} from './internal/symbols';
import type {
  AppendData,
  AppendSlots,
  GetData,
  GetSlots,
  PluginProvider,
  PluginRoute,
  PluginScopeStateFor,
  PluginState,
} from './internal/types';

interface ResolvedPlugins<T extends PluginState> {
  routes: PluginRoute[];
  initialize: () => PluginScope<PluginScopeStateFor<T>>; // TODO: Consider passing there the parent scope
}

export class PluginResolver<T extends PluginState> {
  private plugins: Plugin<any>[] = [];

  // TODO: Allow passing plugin configuration
  public register<U extends Plugin<any>>(
    plugin: U
  ): PluginResolver<AppendData<AppendSlots<T, GetSlots<GetPluginState<U>>>, GetData<GetPluginState<U>>>> {
    if (this.plugins.includes(plugin)) {
      // eslint-disable-next-line no-console
      console.warn(`The "${plugin[PluginDetails].name}" plugin is already registered.`);
      return this;
    }
    const order = plugin[PluginDetails].order || 0;
    const index = this.plugins.findIndex(x => x[PluginDetails].order > order);
    this.plugins.splice(index === -1 ? this.plugins.length : index, 0, plugin);
    return this;
  }

  // TODO: Allow passing `baseUrl`
  // TODO: Allow passing parent scope
  public resolve(): [FC<PropsWithChildren<{root: PluginScope<PluginScopeStateFor<T>>}>>, ResolvedPlugins<T>] {
    type RootScopeType = PluginScope<PluginScopeStateFor<T>>;
    const initializers: ((context: RootScopeType) => void)[] = [];
    const initialData: Partial<RootScopeType['data']> = {};
    const providers: PluginProvider<any>[] = [];
    const routes: PluginRoute[] = [];
    const warnings: string[] = [];

    // Utils
    const createInitializer = (plugin: Plugin<any>): ((root: RootScopeType) => void) => {
      return root => {
        const scope = root.children(plugin);
        plugin[PluginInit](scope);
        scope[PluginScopeDisableNewSync]();
      };
    };

    // Detect sources of different resources
    const {slots: slotSource, data: dataSource} = detectResources(this.plugins);

    // Detect direct dependencies for each plugin
    const {hard: deps, loose: looseDeps} = detectDirectDependencies(this.plugins);

    // Detect missing and duplicated slots & data
    // TODO: Regarding messages below - maybe the resource could be treat as optional,
    //       when it is both declared and external?
    this.plugins.forEach(plugin => {
      const config = plugin[PluginDetails];
      Object.keys(config.externalData)
        .filter(name => !dataSource[name])
        .forEach(name => {
          // TODO: Consider if that should be error. Maybe `optionalData` would be helpful?
          warnings.push(`${config.name}: required "${name}" data is not registered.`);
        });
      Object.keys(config.externalSlots)
        .filter(name => !slotSource[name])
        .forEach(name => {
          // TODO: Consider if that should be error. Maybe `optionalSlots` would be helpful?
          warnings.push(`${config.name}: required "${name}" slot is not registered.`);
        });
      Object.keys(config.data)
        .filter(name => dataSource[name].length > 1)
        .forEach(name => {
          warnings.push(`${config.name}: data "${name}" is declared in ${dataSource[name].length} plugins.`);
        });
      Object.keys(config.slots)
        .filter(name => slotSource[name].length > 1)
        .forEach(name => {
          // TODO: Consider if that should be error. May single slot be used in multiple plugins?
          warnings.push(`${config.name}: slot "${name}" is declared in ${slotSource[name].length} plugins.`);
        });
    });

    // Detect circular dependencies
    detectCircularDependencies(deps).forEach(({from, through}) =>
      warnings.push(`circular dependency: ${from[PluginDetails].name} ➟ ${through[PluginDetails].name}`)
    );

    // Order everything
    let left = [...this.plugins];
    while (left.length > 0) {
      // Choose the (1) first independent item, or (2) first almost independent item, or (3) first item
      const next = left.find(x => deps.get(x)!.size === 0) || left.find(x => looseDeps.get(x)!.size === 0) || left[0];

      // Ignore already loaded plugins
      left = left.filter(x => next !== x);

      // Mark already included dependencies
      left.forEach(x => {
        deps.get(x)!.delete(next);
        looseDeps.get(x)!.delete(next);
      });

      // Include dependencies
      providers.push(...next[PluginDetails].providers);
      providers.push({type: PluginLocalProvider, props: {plugin: next}});
      routes.push(...next[PluginDetails].routes); // TODO: Shouldn't routes be ordered independently?
      initializers.push(createInitializer(next));
      Object.assign(initialData, {...next[PluginDetails].data});
    }

    if (warnings.length > 0) {
      // eslint-disable-next-line no-console
      console.warn(`Detected problems with plugins:\n${warnings.join('\n')}`);
    }

    const initialize = () => {
      const root: RootScopeType = new PluginScope(null, {
        slots: Object.keys(slotSource) as any,
        data: Object.keys(dataSource) as any,
        inheritedData: [],
        inheritedSlots: [],
        inheritedReadonlyData: [],
      });
      Object.keys(initialData).forEach((key: keyof RootScopeType['data']) => {
        root.data[key] = initialData[key]!;
      });
      initializers.forEach(init => init(root));
      return root;
    };

    const Provider: FC<PropsWithChildren<{root: RootScopeType}>> = ({root, children}) => {
      let current = children;
      for (let i = providers.length - 1; i >= 0; i -= 1) {
        current = createElement(providers[i].type, providers[i].props, current);
      }
      return createElement(PluginScopeProvider, {root}, current);
    };

    return [Provider, {routes, initialize}];
  }
}
