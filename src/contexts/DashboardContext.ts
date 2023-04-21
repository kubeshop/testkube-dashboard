import {createContext} from 'react';
import {Location, NavigateFunction} from 'react-router';

interface DashboardContextData {
  navigate: NavigateFunction;
  location: Location;

  showLogoInSider: boolean;
  showSocialLinksInSider: boolean;
}

const DashboardContext = createContext<DashboardContextData>(undefined!);

export default DashboardContext;
