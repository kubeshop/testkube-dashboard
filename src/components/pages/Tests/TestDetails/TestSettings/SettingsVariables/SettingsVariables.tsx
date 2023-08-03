import {FC} from 'react';

import {Space} from 'antd';

import Variables from '@organisms/EntityDetails/EntityDetailsContent/Settings/SettingsVariables/Variables';

import Arguments from './Arguments';

const SettingsVariables: FC = () => (
  <Space size={30} direction="vertical">
    <Variables />
    <Arguments />
  </Space>
);

export default SettingsVariables;
