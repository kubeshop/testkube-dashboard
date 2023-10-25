import {PluginBuilder} from './internal/PluginBuilder';
import type {EmptyPluginState} from './internal/types';

export const createPlugin = (name: string, version: string | null = null) =>
  new PluginBuilder<EmptyPluginState>({
    name,
    version,
    order: 0,

    routes: [],
    providers: [],

    config: {},
    externalData: {},
    externalSlots: {},
    outerData: {},
    outerSlots: {},
    data: {},
    slots: {},
    urls: {},
  });
