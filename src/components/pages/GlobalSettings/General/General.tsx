import {Space} from 'antd';

import ApiEndpoint from './ApiEndpoint';
import ConnectCloud from './ConnectCloud';
import YourInstallation from './YourInstallation';

const GeneralSettings = () => {
  return (
    <Space size={30} direction="vertical">
      <ApiEndpoint />
      <YourInstallation />
      <ConnectCloud />
    </Space>
  );
};

export default GeneralSettings;
