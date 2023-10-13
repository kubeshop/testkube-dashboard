import type {ReactElement} from 'react';

import {Plugin} from './Plugin';
import {PluginScope} from './PluginScope';
import type {
  AppendData,
  AppendRoute,
  JoinExternalState,
  JoinState,
  PluginDetails,
  PluginProvider,
  PluginRouteMetadata,
  PluginScopeStateFor,
  PluginState,
} from './types';

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
   * TODO: Allow passing providers to specific routes, based on function.
   */
  public provider<U>(provider: PluginProvider<U>): PluginBuilder<T> {
    return new PluginBuilder({
      ...this.plugin,
      providers: [...this.plugin.providers, provider],
    });
  }

  /**
   * Register public data in context of the plugin.
   * It will initialize them with the provided values.
   */
  public data<U extends Record<string, any>>(data: U): PluginBuilder<AppendData<T, U>> {
    return new PluginBuilder<AppendData<T, U>>({
      ...this.plugin,
      data: {...this.plugin.data, ...data},
    });
  }

  /**
   * Define slots and dynamic data in the context of the plugin.
   */
  public define<U extends PluginState>(state: U): PluginBuilder<JoinState<T, U>> {
    return new PluginBuilder<JoinState<T, U>>({
      ...this.plugin,
      slots: {...this.plugin.slots, ...state.slots},
      data: {...this.plugin.data, ...state.data},
    });
  }

  /**
   * Declare using data and slots from the external plugin.
   */
  public needs<U extends PluginState>(state: U): PluginBuilder<JoinExternalState<T, U>> {
    return new PluginBuilder<JoinExternalState<T, U>>({
      ...this.plugin,
      externalSlots: {...this.plugin.externalSlots, ...state.slots},
      externalData: {...this.plugin.externalData, ...state.data},
    });
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
  }> {
    return new Plugin(this.plugin, fn) as any;
  }
}
