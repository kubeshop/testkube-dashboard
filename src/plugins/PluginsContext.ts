import {createContext} from 'react';

export interface PluginData {
  data: any;
  priority?: number;
}

export type PluginSlots = Record<string, any[]>;

export interface Plugin {
  name: string;
  setup: (pluginSlots: PluginSlots) => void;
  order?: number;
}

export interface PluginsContextProps {
  pluginSlots: PluginSlots;
}

const PluginsContext = createContext<PluginsContextProps>({
  pluginSlots: {} as PluginSlots,
});

export default PluginsContext;
