import {createContext} from 'react';

export interface PluginData {
  getComponent: (props?: any) => any;
  order?: number;
}

export type PluginItems = Record<string, PluginData[]>;

export interface Plugin {
  name: string;
  setup: (pluginItems: PluginItems) => void;
  order?: number;
}

export interface PluginsContextProps {
  pluginItems: PluginItems;
}

const PluginsContext = createContext<PluginsContextProps>({
  pluginItems: {} as PluginItems,
});

export default PluginsContext;
