import {createContext} from 'react';

interface ConfigContextData {
  pageTitle: string;
  discordUrl: string;
}

const ConfigContext = createContext<ConfigContextData>(undefined!);

export default ConfigContext;
