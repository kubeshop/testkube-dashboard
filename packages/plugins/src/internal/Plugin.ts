import {PluginDetails as PluginDetailsSymbol, PluginInit} from './symbols';
import type {PluginDetails, PluginScope, PluginState} from './types';

export class Plugin<T extends PluginState> {
  public readonly [PluginInit]: (context: PluginScope<T>) => void;
  public readonly [PluginDetailsSymbol]: PluginDetails<T>;

  public constructor(config: PluginDetails<T>, initFn: (tk: PluginScope<T>) => void) {
    this[PluginInit] = initFn;
    this[PluginDetailsSymbol] = config;
  }
}

export type GetPluginState<T extends Plugin<any>> = T extends Plugin<infer U> ? U : never;
