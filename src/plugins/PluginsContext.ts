import {createContext} from 'react';

import PluginScope from './PluginScope';

export interface PluginsContextProps {
  scope: PluginScope;
}

const PluginsContext = createContext<PluginsContextProps>({
  scope: {} as PluginScope,
});

export default PluginsContext;
