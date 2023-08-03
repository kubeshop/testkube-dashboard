import {Space} from 'antd';

import About from './About';
import ApiEndpoint from './ApiEndpoint';
import ConnectCloud from './ConnectCloud';

const GeneralSettings = () => {
  return (
    <Space size={30} direction="vertical">
      <ApiEndpoint />
      <About />
      <ConnectCloud />
    </Space>
  );
};

export default GeneralSettings;
