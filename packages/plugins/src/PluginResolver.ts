import {FC, PropsWithChildren, createElement} from 'react';

import {ConditionalProvider} from './internal/ConditionalProvider';
import type {GetPluginState, Plugin, PluginEntry, PluginEntryObject} from './internal/Plugin';
import {PluginLocalProvider} from './internal/PluginLocalProvider';
import {PluginScope} from './internal/PluginScope';
import {PluginScopeProvider} from './internal/PluginScopeProvider';
import {detectCircularDependencies} from './internal/detectCircularDependencies';
import {detectDirectDependencies} from './internal/detectDirectDependencies';
import {detectResources} from './internal/detectResources';
import {PluginDetails, PluginInit, PluginScopeDisableNewSync} from './internal/symbols';
import type {
  EmptyPluginState,
  PluginProviderContainer,
  PluginRoute,
  PluginScopeStateFor,
  PluginState,
} from './internal/types';

interface ResolvedPlugins<T extends PluginState> {
  routes: PluginRoute[];
  initialize: (
    parent?: PluginScope<any> | null
  ) => PluginScope<{[K in keyof PluginScopeStateFor<T>]: PluginScopeStateFor<T>[K]}>;
}

export class PluginResolver<T extends PluginState = EmptyPluginState> {
  private plugins: PluginEntryObject<any>[] = [];

  public register<U extends Plugin<any>>(
    plugin: U,
    config: GetPluginState<U>['config'] = {}
  ): PluginResolver<{
    config: {};
    urls: T['urls'] & GetPluginState<U>['urls'];
    slots: T['slots'] & GetPluginState<U>['slots'];
    data: T['data'] & GetPluginState<U>['data'];
    externalSlots: T['externalSlots'] & GetPluginState<U>['externalSlots'];
    externalData: T['externalData'] & GetPluginState<U>['externalData'];
    outerSlots: T['outerSlots'] & GetPluginState<U>['outerSlots'];
    outerData: T['outerData'] & GetPluginState<U>['outerData'];
  }> {
    // TODO: Shouldn't allow to have multiple instances of the same plugin?
    if (this.plugins.some(x => x.plugin === plugin)) {
      // eslint-disable-next-line no-console
      console.warn(`The "${plugin[PluginDetails].name}" plugin is already registered.`);
      return this;
    }

    if (!plugin[PluginDetails]) {
      throw Object.assign(new Error('Invalid plugin passed for registration'), {plugin});
    }

    const missingKeys = Object.keys(plugin[PluginDetails].config).filter(
      key => plugin[PluginDetails].config[key] === undefined && config[key] === undefined
    );
    if (missingKeys.length > 0) {
      throw Object.assign(
        new Error(`The "${plugin[PluginDetails].name}" plugin is missing configuration: ${missingKeys.join(', ')}`),
        {plugin}
      );
    }

    const order = plugin[PluginDetails].order || 0;
    const index = this.plugins.findIndex(x => x.plugin[PluginDetails].order > order);
    this.plugins.splice(index === -1 ? this.plugins.length : index, 0, plugin.configure(config));
    return this;
  }

  public resolve(): [FC<PropsWithChildren<{root: PluginScope<PluginScopeStateFor<T>>}>>, ResolvedPlugins<T>] {
    type RootScopeType = PluginScope<PluginScopeStateFor<T>>;
    const initializers: ((context: RootScopeType) => void)[] = [];
    const initialData: Partial<RootScopeType['data']> = {};
    const staticProviders: PluginProviderContainer<any, T>[] = [];
    const dynamicProviders: PluginProviderContainer<any, T>[] = [];
    const routes: PluginRoute[] = [];
    const warnings: string[] = [];
    const plugins = this.plugins.map(x => x.plugin);

    // Utils
    const createInitializer = ({plugin, config}: PluginEntryObject<any>): ((root: RootScopeType) => void) => {
      return root => {
        const scope = root.children(plugin);
        plugin[PluginInit](scope, config);
        scope[PluginScopeDisableNewSync]();
      };
    };

    // Detect sources of different resources
    const {slots: slotSource, data: dataSource, outerData, outerSlots} = detectResources(plugins);

    // Detect direct dependencies for each plugin
    const {hard: deps, loose: looseDeps} = detectDirectDependencies(plugins);

    // Detect missing and duplicated slots & data
    plugins.forEach(plugin => {
      const config = plugin[PluginDetails];
      Object.keys(config.externalData)
        .filter(name => !dataSource[name])
        .forEach(name => {
          warnings.push(`${config.name}: required "${name}" data is not registered.`);
        });
      Object.keys(config.externalSlots)
        .filter(name => !slotSource[name])
        .forEach(name => {
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
      const next =
        left.find(x => deps.get(x.plugin)!.size === 0) ||
        left.find(x => looseDeps.get(x.plugin)!.size === 0) ||
        left[0];

      // Ignore already loaded plugins
      left = left.filter(x => next !== x);

      // Mark already included dependencies
      left.forEach(x => {
        deps.get(x.plugin)!.delete(next.plugin);
        looseDeps.get(x.plugin)!.delete(next.plugin);
      });

      // Group providers
      const ownStaticProviders = next.plugin[PluginDetails].providers.filter(x => !x.metadata.enabled);
      const ownDynamicProviders = next.plugin[PluginDetails].providers.filter(x => x.metadata.enabled);

      // Include dependencies
      staticProviders.push(...ownStaticProviders);

      if (ownDynamicProviders.length === 0) {
        staticProviders.push({provider: {type: PluginLocalProvider, props: {plugin: next.plugin}}, metadata: {}});
      } else {
        dynamicProviders.push(
          ...ownDynamicProviders.map(provider => ({
            provider: {type: ConditionalProvider, props: {provider}},
            metadata: provider.metadata,
          }))
        );
        dynamicProviders.push({provider: {type: PluginLocalProvider, props: {plugin: next.plugin}}, metadata: {}});
      }
      routes.push(...next.plugin[PluginDetails].routes); // TODO: Shouldn't routes be ordered independently?
      initializers.push(createInitializer(next));
      Object.assign(initialData, {...next.plugin[PluginDetails].data});
    }

    if (warnings.length > 0) {
      // eslint-disable-next-line no-console
      console.warn(`Detected problems with plugins:\n${warnings.join('\n')}`);
    }

    // TODO: Consider registering in the parent scope,
    //       so the destroy & events would be propagated from there too.
    //       ...
    //       Alternatively, the lower scope could listen to events,
    //       and just transfer them down.
    const initialize = (parent: PluginScope<any> | null = null) => {
      const root: RootScopeType = new PluginScope(parent, {
        slots: Object.keys(slotSource) as any,
        data: Object.keys(dataSource) as any,
        inheritedData: [],
        inheritedSlots: outerSlots,
        outerSlots: [],
        inheritedReadonlyData: outerData,
      });
      Object.keys(initialData).forEach((key: keyof RootScopeType['data']) => {
        root.data[key] = initialData[key]!;
      });
      initializers.forEach(init => init(root));
      return root;
    };

    // Sort the providers
    staticProviders.sort((a, b) =>
      (a.metadata.order || 0) === (b.metadata.order || 0)
        ? 0
        : (a.metadata.order || 0) > (b.metadata.order || 0)
        ? 1
        : -1
    );
    dynamicProviders.sort((a, b) =>
      (a.metadata.order || 0) === (b.metadata.order || 0)
        ? 0
        : (a.metadata.order || 0) > (b.metadata.order || 0)
        ? 1
        : -1
    );

    const providers = staticProviders.concat(dynamicProviders);

    const Provider: FC<PropsWithChildren<{root: RootScopeType}>> = ({root, children}) => {
      let current = children;
      for (let i = providers.length - 1; i >= 0; i -= 1) {
        current = createElement(providers[i].provider.type, providers[i].provider.props, current);
      }
      return createElement(PluginScopeProvider, {root}, current);
    };

    return [Provider, {routes, initialize}];
  }

  // TODO: Add type validation for missing config
  public static of<T>(...plugins: PluginEntry<any>[]): PluginResolver<any> {
    return plugins.reduce(
      (resolver, entry) =>
        'plugin' in entry ? resolver.register(entry.plugin, entry.config) : resolver.register(entry),
      new PluginResolver<any>()
    );
  }
}
