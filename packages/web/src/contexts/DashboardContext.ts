import {createContext} from 'react';
import {Location, NavigateFunction} from 'react-router';

interface DashboardContextData {
  navigate: NavigateFunction;
  location: Location;
  baseUrl: string;

  showLogoInSider: boolean;
  showTestkubeCloudBanner: boolean;
}

const DashboardContext = createContext<DashboardContextData>(undefined!);

export default DashboardContext;
