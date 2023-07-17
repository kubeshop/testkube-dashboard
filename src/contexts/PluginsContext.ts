import {createContext} from 'react';

import {PluginManager} from '@src/utils/createPluginManager';

export enum PluginKeys {
  ExecutionDetailTabs = 'executionDetailTabs',
}

export type Plugins = Record<PluginKeys, any[]>;

export interface PluginsContextProps {
  pluginManager: PluginManager;
}

const PluginsContext = createContext<PluginsContextProps>({
  pluginManager: {} as PluginManager,
});

export default PluginsContext;
