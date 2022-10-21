import {Space} from 'antd';

import Arguments from './Arguments';
import Command from './Command';

const CommandAndArguments: React.FC = () => {
  return (
    <Space size={30} direction="vertical">
      <Command />
      <Arguments />
    </Space>
  );
};

export default CommandAndArguments;
