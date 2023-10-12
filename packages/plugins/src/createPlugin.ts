import {PluginBuilder} from './internal/PluginBuilder';
import type {EmptyPluginState} from './internal/types';

export const createPlugin = (name: string, version: string | null = null) =>
  new PluginBuilder<EmptyPluginState>({
    name,
    version,
    order: 0,

    routes: [],
    providers: [],

    externalData: {},
    externalSlots: {},
    data: {},
    slots: {},
    urls: {},
  });
