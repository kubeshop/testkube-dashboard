import {FC} from 'react';

import {Space} from 'antd';

import Variables from '@organisms/EntityDetails/EntityDetailsContent/Settings/SettingsVariables/Variables';

const SettingsVariables: FC = () => (
  <Space size={30} direction="vertical">
    <Variables />
  </Space>
);

export default SettingsVariables;
