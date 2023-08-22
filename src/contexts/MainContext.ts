import {createContext} from 'react';

import type {ClusterConfig} from '@models/config';

export type MainContextProps = {
  clusterConfig?: ClusterConfig;
  clusterVersion?: string;
  isClusterAvailable: boolean;
  isDashboardBannerVisible?: boolean;
  setIsDashboardBannerVisible?: (isVisible: boolean) => void;
};

// @ts-ignore
const MainContext = createContext<MainContextProps>();

export default MainContext;
