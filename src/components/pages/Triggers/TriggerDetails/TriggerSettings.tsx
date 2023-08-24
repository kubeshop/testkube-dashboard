import {FC, memo} from 'react';

import {SettingsLayout} from '@molecules/SettingsLayout';

import {TriggerDefinition as Definition} from './TriggerSettings/Definition';
import {General} from './TriggerSettings/General';
import {TriggerAction} from './TriggerSettings/TriggerAction';
import {TriggerCondition} from './TriggerSettings/TriggerCondition';

interface TriggerSettingsProps {
  reload: () => void;
  tab: string;
  onTabChange: (tab: string) => void;
}

export const TriggerSettings: FC<TriggerSettingsProps> = memo(({reload, tab, onTabChange}) => (
  <SettingsLayout
    active={tab}
    onChange={onTabChange}
    tabs={[
      {id: 'general', label: 'General', children: <General />},
      {id: 'condition', label: 'Trigger Condition', children: <TriggerCondition />},
      {id: 'action', label: 'Trigger Action', children: <TriggerAction />},
      {id: 'definition', label: 'Definition', children: <Definition reload={reload} />},
    ]}
  />
));
