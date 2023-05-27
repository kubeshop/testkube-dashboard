import {Space} from 'antd';

import Condition from './Condition';

const TriggerCondition: React.FC = () => {
  return (
    <Space size={30} direction="vertical">
      <Condition />
    </Space>
  );
};

export default TriggerCondition;
