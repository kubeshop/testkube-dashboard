import {FC, memo} from 'react';

import {SettingsLayout} from '@molecules';

import Definition from './Definition';
import General from './General';
import TriggerAction from './TriggerAction';
import TriggerCondition from './TriggerCondition';

interface TriggerSettingsProps {
  tab: string;
  onTabChange: (tab: string) => void;
}

const TriggerSettings: FC<TriggerSettingsProps> = ({tab, onTabChange}) => (
  <SettingsLayout
    active={tab}
    onChange={onTabChange}
    tabs={[
      {id: 'general', label: 'General', children: <General />},
      {id: 'condition', label: 'Trigger Condition', children: <TriggerCondition />},
      {id: 'action', label: 'Trigger Action', children: <TriggerAction />},
      {id: 'definition', label: 'Definition', children: <Definition />},
    ]}
  />
);

export default memo(TriggerSettings);
