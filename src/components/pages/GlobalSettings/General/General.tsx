import {Space} from 'antd';

import ApiEndpoint from './ApiEndpoint';

const GeneralSettings = () => {
  return (
    <Space size={30} direction="vertical">
      <ApiEndpoint />
    </Space>
  );
};

export default GeneralSettings;
