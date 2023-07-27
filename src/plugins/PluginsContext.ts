import {createContext} from 'react';

import PluginScope from './PluginScope';

export interface PluginsContextProps {
  scope: PluginScope;
}

const PluginsContext = createContext<PluginsContextProps>(undefined!);
export default PluginsContext;
