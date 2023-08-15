import {useTriggersPick} from '@store/triggers';

import Condition from './Condition';
import ResourceCondition from './ResourceCondition';

const TriggerCondition: React.FC = () => {
  const {keyMap} = useTriggersPick('keyMap');

  return (
    <>
      <Condition />
      {keyMap?.conditions ? <ResourceCondition /> : null}
    </>
  );
};

export default TriggerCondition;
