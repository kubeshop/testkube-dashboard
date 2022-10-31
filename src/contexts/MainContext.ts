import {createContext} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

import {useGA4React} from 'ga-4-react';

import {ClusterConfig} from '@models/config';

import {useAppDispatch} from '@redux/hooks';

export type MainContextProps = {
  dispatch: ReturnType<typeof useAppDispatch>;
  navigate: ReturnType<typeof useNavigate>;
  ga4React: ReturnType<typeof useGA4React>;
  location: ReturnType<typeof useLocation>;
  apiEndpoint: string | null;
  wsRoot: string;
  clusterConfig?: ClusterConfig;
};

// @ts-ignore
const MainContext = createContext<MainContextProps>();

export default MainContext;
