import {FC, PropsWithChildren, useContext} from 'react';
import {Outlet} from 'react-router-dom';

import {MainContext} from '@contexts';

import Offline from '@pages/Offline';

const ClusterRequired: FC<PropsWithChildren<{}>> = ({children}) => {
  const {isClusterAvailable} = useContext(MainContext);
  return isClusterAvailable ? <Outlet /> : <Offline />;
};

export default ClusterRequired;
