import {Space} from 'antd';

import Action from './Action';

const TriggerAction: React.FC = () => {
  return (
    <Space size={30} direction="vertical">
      <Action />
    </Space>
  );
};

export default TriggerAction;
