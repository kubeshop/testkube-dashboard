import {createContext} from 'react';

import {ClusterConfig} from '@models/config';

import {useAppDispatch} from '@redux/hooks';

export type MainContextProps = {
  dispatch: ReturnType<typeof useAppDispatch>;
  clusterConfig?: ClusterConfig;
  clusterVersion?: string;
  isClusterAvailable: boolean;
  isDashboardBannerVisible?: boolean;
  setIsDashboardBannerVisible?: (isVisible: boolean) => void;
};

// @ts-ignore
const MainContext = createContext<MainContextProps>();

export default MainContext;
