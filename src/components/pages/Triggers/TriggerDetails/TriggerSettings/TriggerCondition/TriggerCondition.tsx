import {Space} from 'antd';

import {useTriggersPick} from '@store/triggers';

import Condition from './Condition';
import ResourceCondition from './ResourceCondition';

const TriggerCondition: React.FC = () => {
  const {keyMap} = useTriggersPick('keyMap');

  return (
    <Space size={30} direction="vertical">
      <Condition />
      {keyMap?.conditions ? <ResourceCondition /> : null}
    </Space>
  );
};

export default TriggerCondition;
