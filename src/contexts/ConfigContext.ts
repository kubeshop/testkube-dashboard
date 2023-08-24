import {createContext} from 'react';

interface ConfigContextData {
  pageTitle: string;
  discordUrl: string;
}

export const ConfigContext = createContext<ConfigContextData>(undefined!);
