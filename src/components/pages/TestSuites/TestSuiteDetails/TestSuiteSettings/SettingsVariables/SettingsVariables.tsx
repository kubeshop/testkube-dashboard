import {FC} from 'react';

import {Space} from 'antd';

import {Variables} from '@organisms/EntityDetails';

const SettingsVariables: FC = () => (
  <Space size={30} direction="vertical">
    <Variables description="Define environment variables which will be shared across your tests. Variables defined at a Test Suite level will override those defined at a Test level." />
  </Space>
);

export default SettingsVariables;
