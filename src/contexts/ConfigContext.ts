import {createContext} from 'react';

interface ConfigContextData {
  pageTitle: string;
  discordUrl: string;
  showLogoInSider: boolean;
  showSocialLinksInSider: boolean;
}

const ConfigContext = createContext<ConfigContextData>(undefined!);

export default ConfigContext;
