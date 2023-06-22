import {Space} from 'antd';

import {useStore} from '@store';

import Condition from './Condition';
import ResourceCondition from './ResourceCondition';

const TriggerCondition: React.FC = () => {
  const {triggersKeyMap} = useStore(state => ({
    triggersKeyMap: state.triggersKeyMap!,
  }));

  return (
    <Space size={30} direction="vertical">
      <Condition />
      {triggersKeyMap.conditions ? <ResourceCondition /> : null}
    </Space>
  );
};

export default TriggerCondition;
