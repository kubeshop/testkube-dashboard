import {FC} from 'react';

import {useTriggersPick} from '@store/triggers';

import {Condition} from './TriggerCondition/Condition';
import {ResourceCondition} from './TriggerCondition/ResourceCondition';

export const TriggerCondition: FC = () => {
  const {keyMap} = useTriggersPick('keyMap');

  return (
    <>
      <Condition />
      {keyMap?.conditions ? <ResourceCondition /> : null}
    </>
  );
};
