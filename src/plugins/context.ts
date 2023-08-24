import {createContext} from 'react';

import {PluginScope} from './PluginScope';

export interface PluginsContextProps {
  scope: PluginScope;
}

export const PluginsContext = createContext<PluginsContextProps>(undefined!);
