import {Space} from 'antd';

import ContainerImagePanel from './ContainerImagePanel';
import PrivateRegistry from './PrivateRegistry';

const ContainerImage: React.FC = () => {
  return (
    <Space size={30} direction="vertical">
      <ContainerImagePanel />
      <PrivateRegistry />
    </Space>
  );
};

export default ContainerImage;
