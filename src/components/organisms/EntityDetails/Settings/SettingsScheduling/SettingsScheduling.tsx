import {Space} from 'antd';

import Schedule from './Schedule';

const SettingsScheduling: React.FC = () => {
  return (
    <Space size={30} direction="vertical">
      <Schedule />
    </Space>
  );
};

export default SettingsScheduling;
