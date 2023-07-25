import {Space} from 'antd';

import {useMainPick} from '@store';

import Condition from './Condition';
import ResourceCondition from './ResourceCondition';

const TriggerCondition: React.FC = () => {
  const {triggersKeyMap} = useMainPick('triggersKeyMap');

  return (
    <Space size={30} direction="vertical">
      <Condition />
      {triggersKeyMap?.conditions ? <ResourceCondition /> : null}
    </Space>
  );
};

export default TriggerCondition;
