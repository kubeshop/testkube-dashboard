import {Space} from 'antd';

import Condition from './Condition';
import ResourceCondition from './ResourceCondition';

const TriggerCondition: React.FC = () => {
  return (
    <Space size={30} direction="vertical">
      <Condition />
      <ResourceCondition />
    </Space>
  );
};

export default TriggerCondition;
