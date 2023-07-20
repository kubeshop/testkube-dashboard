import {createContext} from 'react';

import {PluginMetaData} from './PluginMetaData';
import PluginScope from './PluginScope';

export interface PluginData {
  component: any;
  metaData: PluginMetaData;
}

export interface Plugin {
  name: string;
  setup: (scope: PluginScope) => void;
  order?: number;
}

export interface PluginsContextProps {
  scope: PluginScope;
}

const PluginsContext = createContext<PluginsContextProps>({
  scope: {} as PluginScope,
});

export default PluginsContext;
