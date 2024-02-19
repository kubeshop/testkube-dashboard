import {PluginOverlay} from './PluginOverlay';
import type {PluginScope} from './PluginScope';
import {PluginDetails as PluginDetailsSymbol, PluginInit} from './symbols';
import type {PluginConfig, PluginConfigInput, PluginDetails, PluginScopeStateFor, PluginState} from './types';
import {defaults} from './utils';

export class Plugin<T extends PluginState> {
  public readonly [PluginInit]: (context: PluginScope<PluginScopeStateFor<T>>, config: T['config']) => void;
  public readonly [PluginDetailsSymbol]: PluginDetails<T>;

  public readonly overlay = new PluginOverlay();

  public constructor(
    config: PluginDetails<T>,
    initFn: (tk: PluginScope<PluginScopeStateFor<T>>, config: PluginConfig<T['config']>) => void
  ) {
    this[PluginInit] = (tk, cfg) => initFn(tk, defaults(this[PluginDetailsSymbol].config, cfg) as any);
    this[PluginDetailsSymbol] = config;
  }

  public configure(config: PluginConfigInput<T['config']>): PluginEntryObject<T> {
    return {plugin: this, config};
  }
}

export type PluginEntryObject<T extends PluginState> = {plugin: Plugin<T>; config: PluginConfigInput<T['config']>};
export type PluginEntry<T extends PluginState> =
  | ({} extends PluginConfigInput<T['config']> ? Plugin<T> : never)
  | PluginEntryObject<T>;

export type GetPluginState<T extends Plugin<any>> = T extends Plugin<infer U> ? U : never;
