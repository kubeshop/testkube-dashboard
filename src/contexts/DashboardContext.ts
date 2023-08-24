import {createContext} from 'react';
import {Location, NavigateFunction} from 'react-router';

interface DashboardContextData {
  navigate: NavigateFunction;
  location: Location;
  baseUrl: string;

  showLogoInSider: boolean;
  showSocialLinksInSider: boolean;
  showTestkubeCloudBanner: boolean;
}

export const DashboardContext = createContext<DashboardContextData>(undefined!);
