import {Space} from 'antd';

import PreRun from './PreRun';

const SettingsGeneral: React.FC = () => {
  return (
    <Space size={30} direction="vertical">
      <PreRun />
    </Space>
  );
};

export default SettingsGeneral;
