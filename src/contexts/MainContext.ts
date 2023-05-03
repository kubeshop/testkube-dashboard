import {createContext} from 'react';

import {useGA4React} from 'ga-4-react';

import {ClusterConfig} from '@models/config';

import {useAppDispatch} from '@redux/hooks';

export type MainContextProps = {
  dispatch: ReturnType<typeof useAppDispatch>;
  ga4React: ReturnType<typeof useGA4React>;
  clusterConfig?: ClusterConfig;
  isClusterAvailable: boolean;
};

// @ts-ignore
const MainContext = createContext<MainContextProps>();

export default MainContext;
