import type {ReactElement} from 'react';
import {createElement} from 'react';

import {usePluginScope} from '../hooks';

import {Plugin} from './Plugin';
import {PluginScope} from './PluginScope';
import type {
  AppendData,
  AppendRoute,
  JoinExternalState,
  JoinOuterState,
  JoinState,
  PluginDetails,
  PluginProvider,
  PluginRouteMetadata,
  PluginScopeStateFor,
  PluginState,
} from './types';
import {PluginProviderMetadata} from './types';

// TODO: Allow declaring plugin configuration
export class PluginBuilder<T extends PluginState> {
  public constructor(private readonly plugin: PluginDetails<T>) {}

  /**
   * Adjust the priority of the plugin inclusion.
   * It will be treated only as a hint,
   * to help on decisioning.
   *
   * When it should be prioritized, use negative numbers, when not: positive.
   */
  public order(order: number): PluginBuilder<T> {
    return new PluginBuilder({...this.plugin, order});
  }

  /**
   * Add routing for the plugin.
   *
   * Optionally, you may pass `order` in metadata to (de)prioritize it.
   * When it should be prioritized, use negative numbers, when not: positive.
   *
   * TODO: Allow passing configuration (modifiers) to route.
   *       The keys for configuration could be declared too from external/internal modules.
   */
  public route<U extends string>(
    path: U,
    element: ReactElement,
    metadata: PluginRouteMetadata = {}
  ): PluginBuilder<AppendRoute<T, U>> {
    return new PluginBuilder({
      ...this.plugin,
      routes: [...this.plugin.routes, {path, element, metadata}],
      urls: {...this.plugin.urls, [path]: true},
    });
  }

  /**
   * Append React provider,
   * that will wrap all the components inside.
   *
   * It may have condition,
   * but conditional providers are included after those without condition.
   */
  public provider<U>(
    rawProvider: PluginProvider<U> | ((tk: PluginScope<PluginScopeStateFor<T>>) => PluginProvider<U>),
    metadata: PluginProviderMetadata<T> = {}
  ): PluginBuilder<T> {
    const provider =
      typeof rawProvider === 'function'
        ? ({
            type: (props: any) => {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const {type: Provider, props: innerProps} = rawProvider(usePluginScope());
              return createElement(Provider as any, {...innerProps, ...props});
            },
            props: {},
          } as unknown as PluginProvider<U>)
        : rawProvider;
    return new PluginBuilder({
      ...this.plugin,
      providers: [...this.plugin.providers, {provider, metadata}],
    });
  }

  /**
   * Register public data in context of the plugin.
   * It will initialize them with the provided values.
   */
  public data<U extends Record<string, any>>(
    data: U
  ): PluginBuilder<{
    urls: {[K in keyof AppendData<T, U>['urls']]: AppendData<T, U>['urls'][K]};
    slots: {[K in keyof AppendData<T, U>['slots']]: AppendData<T, U>['slots'][K]};
    data: {[K in keyof AppendData<T, U>['data']]: AppendData<T, U>['data'][K]};
    externalSlots: {[K in keyof AppendData<T, U>['externalSlots']]: AppendData<T, U>['externalSlots'][K]};
    externalData: {[K in keyof AppendData<T, U>['externalData']]: AppendData<T, U>['externalData'][K]};
    outerSlots: {[K in keyof AppendData<T, U>['outerSlots']]: AppendData<T, U>['outerSlots'][K]};
    outerData: {[K in keyof AppendData<T, U>['outerData']]: AppendData<T, U>['outerData'][K]};
  }> {
    return new PluginBuilder<AppendData<T, U>>({
      ...this.plugin,
      data: {...this.plugin.data, ...data},
    }) as any;
  }

  /**
   * Define slots and dynamic data in the context of the plugin.
   */
  public define<U extends PluginState>(
    state: U
  ): PluginBuilder<{
    urls: {[K in keyof JoinState<T, U>['urls']]: JoinState<T, U>['urls'][K]};
    slots: {[K in keyof JoinState<T, U>['slots']]: JoinState<T, U>['slots'][K]};
    data: {[K in keyof JoinState<T, U>['data']]: JoinState<T, U>['data'][K]};
    externalSlots: {[K in keyof JoinState<T, U>['externalSlots']]: JoinState<T, U>['externalSlots'][K]};
    externalData: {[K in keyof JoinState<T, U>['externalData']]: JoinState<T, U>['externalData'][K]};
    outerSlots: {[K in keyof JoinState<T, U>['outerSlots']]: JoinState<T, U>['outerSlots'][K]};
    outerData: {[K in keyof JoinState<T, U>['outerData']]: JoinState<T, U>['outerData'][K]};
  }> {
    return new PluginBuilder<JoinState<T, U>>({
      ...this.plugin,
      slots: {...this.plugin.slots, ...state.slots},
      data: {...this.plugin.data, ...state.data},
    }) as any;
  }

  /**
   * Declare using data and slots from the external plugin.
   */
  public needs<U extends PluginState>(
    state: U
  ): PluginBuilder<{
    urls: {[K in keyof JoinExternalState<T, U>['urls']]: JoinExternalState<T, U>['urls'][K]};
    slots: {[K in keyof JoinExternalState<T, U>['slots']]: JoinExternalState<T, U>['slots'][K]};
    data: {[K in keyof JoinExternalState<T, U>['data']]: JoinExternalState<T, U>['data'][K]};
    externalSlots: {[K in keyof JoinExternalState<T, U>['externalSlots']]: JoinExternalState<T, U>['externalSlots'][K]};
    externalData: {[K in keyof JoinExternalState<T, U>['externalData']]: JoinExternalState<T, U>['externalData'][K]};
    outerSlots: {[K in keyof JoinExternalState<T, U>['outerSlots']]: JoinExternalState<T, U>['outerSlots'][K]};
    outerData: {[K in keyof JoinExternalState<T, U>['outerData']]: JoinExternalState<T, U>['outerData'][K]};
  }> {
    return new PluginBuilder<JoinExternalState<T, U>>({
      ...this.plugin,
      externalSlots: {...this.plugin.externalSlots, ...state.slots},
      externalData: {...this.plugin.externalData, ...state.data},
    }) as any;
  }

  /**
   * Declare using data and slots from the plugin of outer scope.
   *
   * That won't trigger warnings neither when plugin not found,
   * nor when it is declared above the current plugin system context.
   */
  public outer<U extends PluginState>(
    state: U
  ): PluginBuilder<{
    urls: {[K in keyof JoinOuterState<T, U>['urls']]: JoinOuterState<T, U>['urls'][K]};
    slots: {[K in keyof JoinOuterState<T, U>['slots']]: JoinOuterState<T, U>['slots'][K]};
    data: {[K in keyof JoinOuterState<T, U>['data']]: JoinOuterState<T, U>['data'][K]};
    externalSlots: {[K in keyof JoinOuterState<T, U>['externalSlots']]: JoinOuterState<T, U>['externalSlots'][K]};
    externalData: {[K in keyof JoinOuterState<T, U>['externalData']]: JoinOuterState<T, U>['externalData'][K]};
    outerSlots: {[K in keyof JoinOuterState<T, U>['outerSlots']]: JoinOuterState<T, U>['outerSlots'][K]};
    outerData: {[K in keyof JoinOuterState<T, U>['outerData']]: JoinOuterState<T, U>['outerData'][K]};
  }> {
    return new PluginBuilder<JoinOuterState<T, U>>({
      ...this.plugin,
      outerSlots: {...this.plugin.outerSlots, ...state.slots},
      outerData: {...this.plugin.outerData, ...state.data},
    }) as any;
  }

  /**
   * Initialize the plugin.
   * Mark as complete and integrate.
   */
  public init(fn: (tk: PluginScope<PluginScopeStateFor<T>>) => void = () => {}): Plugin<{
    urls: {[K in keyof T['urls']]: T['urls'][K]};
    slots: {[K in keyof T['slots']]: T['slots'][K]};
    data: {[K in keyof T['data']]: T['data'][K]};
    externalSlots: {[K in keyof T['externalSlots']]: T['externalSlots'][K]};
    externalData: {[K in keyof T['externalData']]: T['externalData'][K]};
    outerSlots: {[K in keyof T['outerSlots']]: T['outerSlots'][K]};
    outerData: {[K in keyof T['outerData']]: T['outerData'][K]};
  }> {
    return new Plugin(this.plugin, fn) as any;
  }
}
