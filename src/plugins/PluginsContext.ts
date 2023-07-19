import {createContext} from 'react';

export interface PluginData {
  getComponent: (props?: any) => any;
  priority?: number;
}

export type PluginSlots = Record<string, PluginData[]>;

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
