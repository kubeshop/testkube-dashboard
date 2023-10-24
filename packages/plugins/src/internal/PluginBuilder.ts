import type {ReactElement} from 'react';
import {createElement} from 'react';

import {usePluginScope} from '../hooks';

import {Plugin} from './Plugin';
import {PluginScope} from './PluginScope';
import type {
  AppendData,
  JoinExternalState,
  JoinOuterState,
  JoinState,
  PluginConfig,
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
   *
   * TODO: Return PluginBuilder<AppendRoute<T>> (but performance is low)
   */
  public route<U extends string>(path: U, element: ReactElement, metadata: PluginRouteMetadata = {}): PluginBuilder<T> {
    return new PluginBuilder({
      ...this.plugin,
      routes: [...this.plugin.routes, {path, element, metadata}],
      urls: {...this.plugin.urls, [path]: true},
    }) as any;
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
          } as any)
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
    config: T['config'];
    urls: T['urls'];
    slots: T['slots'];
    data: {[K in keyof AppendData<T, U>['data']]: AppendData<T, U>['data'][K]};
    externalSlots: T['externalSlots'];
    externalData: T['externalData'];
    outerSlots: T['outerSlots'];
    outerData: T['outerData'];
  }> {
    return new PluginBuilder({
      ...this.plugin,
      data: {...this.plugin.data, ...data},
    }) as any;
  }

  /**
   * Define local configuration, slots and dynamic data in the context of the plugin.
   */
  public define<U extends PluginState>(
    state: U
  ): PluginBuilder<{
    config: T['config'] & U['config'];
    urls: T['urls'];
    slots: {[K in keyof JoinState<T, U>['slots']]: JoinState<T, U>['slots'][K]};
    data: {[K in keyof JoinState<T, U>['data']]: JoinState<T, U>['data'][K]};
    externalSlots: T['externalSlots'];
    externalData: T['externalData'];
    outerSlots: T['outerSlots'];
    outerData: T['outerData'];
  }> {
    return new PluginBuilder({
      ...this.plugin,
      config: {...this.plugin.config, ...state.config},
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
    config: T['config'];
    urls: T['urls'];
    slots: T['slots'];
    data: T['data'];
    externalSlots: {[K in keyof JoinExternalState<T, U>['externalSlots']]: JoinExternalState<T, U>['externalSlots'][K]};
    externalData: {[K in keyof JoinExternalState<T, U>['externalData']]: JoinExternalState<T, U>['externalData'][K]};
    outerSlots: T['outerSlots'];
    outerData: T['outerData'];
  }> {
    return new PluginBuilder({
      ...this.plugin,
      externalSlots: {...this.plugin.externalSlots, ...state.slots},
      externalData: {...this.plugin.externalData, ...state.data},
    });
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
    config: T['config'];
    urls: T['urls'];
    slots: T['slots'];
    data: T['data'];
    externalSlots: T['externalSlots'];
    externalData: T['externalData'];
    outerSlots: {[K in keyof JoinOuterState<T, U>['outerSlots']]: JoinOuterState<T, U>['outerSlots'][K]};
    outerData: {[K in keyof JoinOuterState<T, U>['outerData']]: JoinOuterState<T, U>['outerData'][K]};
  }> {
    return new PluginBuilder({
      ...this.plugin,
      outerSlots: {...this.plugin.outerSlots, ...state.slots},
      outerData: {...this.plugin.outerData, ...state.data},
    });
  }

  /**
   * Initialize the plugin.
   * Mark as complete and integrate.
   */
  public init(
    fn: (tk: PluginScope<PluginScopeStateFor<T>>, config: PluginConfig<T['config']>) => void = () => {}
  ): Plugin<T> {
    return new Plugin(this.plugin, fn) as any;
  }
}
