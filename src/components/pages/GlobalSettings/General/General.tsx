import {Space} from 'antd';

import ApiEndpoint from './ApiEndpoint';
import ConnectCloud from './ConnectCloud';

const GeneralSettings = () => {
  return (
    <Space size={30} direction="vertical">
      <ApiEndpoint />
      <ConnectCloud />
    </Space>
  );
};

export default GeneralSettings;
