import {createContext} from 'react';

import {PluginManager} from '@src/utils/createPluginManager';

export enum PluginKeys {
  ExecutionDetailTabs = 'executionDetailTabs',
}

export interface PluginData {
  data: any;
  index?: number;
}

// export type Plugins = Record<PluginKeys, any[]>;

// datastructure that adds index to each plugin
export type Plugins = Record<PluginKeys, PluginData[]>;

export interface PluginsContextProps {
  pluginManager: PluginManager;
}

const PluginsContext = createContext<PluginsContextProps>({
  pluginManager: {} as PluginManager,
});

export default PluginsContext;
