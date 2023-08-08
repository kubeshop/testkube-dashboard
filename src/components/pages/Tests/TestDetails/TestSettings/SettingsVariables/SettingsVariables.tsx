import {FC} from 'react';

import {Space} from 'antd';

import {Variables} from '@organisms/EntityDetails';

import Arguments from './Arguments';

const SettingsVariables: FC = () => (
  <Space size={30} direction="vertical">
    <Variables description="Define environment variables which will be shared across your test." />
    <Arguments />
  </Space>
);

export default SettingsVariables;
