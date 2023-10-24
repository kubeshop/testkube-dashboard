import {createPlugin} from './createPlugin';
import type {Plugin} from './internal/Plugin';
import {PluginBuilder} from './internal/PluginBuilder';
import type {EmptyPluginState} from './internal/types';
import {config, data} from './utils';

export const createDataPlugin =
  <T extends Record<string, any>>(name: string) =>
  <U extends {[K in keyof T]: T[K] | undefined}>(value: U): Plugin<EmptyPluginState & {config: T | U}> =>
    Object.keys(value)
      .reduce(
        (builder, key) => builder.order(-Infinity).define(config()(key, value[key])).define(data()(key)),
        createPlugin(name) as PluginBuilder<any>
      )
      .init((tk, cfg) => {
        Object.keys(cfg).forEach(key => {
          tk.data[key] = cfg[key];
        });
      });
