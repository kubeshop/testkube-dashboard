import {Space} from 'antd';

import Delete from './Delete';
import Labels from './Labels';
import NameNDescription from './NameNDescription';

const SettingsGeneral: React.FC = () => {
  return (
    <Space size={30} direction="vertical">
      <NameNDescription />
      <Labels />
      <Delete />
    </Space>
  );
};

export default SettingsGeneral;
