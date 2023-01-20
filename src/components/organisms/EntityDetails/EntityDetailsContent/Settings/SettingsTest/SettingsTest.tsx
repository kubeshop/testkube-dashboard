import {Space} from 'antd';

import Source from './Source';
import TestType from './TestType';

const SettingsTest = () => {
  return (
    <Space size={30} direction="vertical">
      <TestType />
      <Source />
    </Space>
  );
};

export default SettingsTest;
