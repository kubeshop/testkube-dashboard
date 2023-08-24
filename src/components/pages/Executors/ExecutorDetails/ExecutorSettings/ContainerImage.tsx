import {FC} from 'react';

import {ContainerImagePanel} from './ContainerImage/ContainerImagePanel';
import {PrivateRegistry} from './ContainerImage/PrivateRegistry';

export const ContainerImage: FC = () => (
  <>
    <ContainerImagePanel />
    <PrivateRegistry />
  </>
);
