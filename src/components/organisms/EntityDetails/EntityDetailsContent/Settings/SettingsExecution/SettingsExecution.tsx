import {Space} from 'antd';

import PostRun from './PostRun';
import PreRun from './PreRun';

const SettingsExecution: React.FC = () => {
  return (
    <Space size={30} direction="vertical">
      <PreRun />
      <PostRun />
    </Space>
  );
};

export default SettingsExecution;
