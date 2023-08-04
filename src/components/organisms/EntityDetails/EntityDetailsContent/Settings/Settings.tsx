import React, {FC} from 'react';

import {Entity} from '@models/entity';

import {SettingsLayout} from '@molecules';
import {SettingsLayoutProps} from '@molecules/SettingsLayout/SettingsLayout';

import {useEntityDetailsPick} from '@store/entityDetails';

import SettingsDefinition from './SettingsDefinition/SettingsDefinition';
import SettingsExecution from './SettingsExecution';
import General from './SettingsGeneral';
import SettingsScheduling from './SettingsScheduling';
import SettingsTest from './SettingsTest';
import SettingsTests from './SettingsTests';
import SettingsVariables from './SettingsVariables';

const tabsConfigMap: Record<Entity, SettingsLayoutProps['tabs']> = {
  'test-suites': [
    {id: 'general', label: 'General', children: <General />},
    {id: 'tests', label: 'Tests', children: <SettingsTests />},
    {id: 'variables', label: 'Variables & Secrets', children: <SettingsVariables />},
    {id: 'scheduling', label: 'Scheduling', children: <SettingsScheduling />},
    {id: 'definition', label: 'Definition', children: <SettingsDefinition />},
  ],
  tests: [
    {id: 'general', label: 'General', children: <General />},
    {id: 'test', label: 'Test', children: <SettingsTest />},
    {id: 'execution', label: 'Execution', children: <SettingsExecution />},
    {id: 'variables', label: 'Variables & Secrets', children: <SettingsVariables />},
    {id: 'scheduling', label: 'Scheduling', children: <SettingsScheduling />},
    {id: 'definition', label: 'Definition', children: <SettingsDefinition />},
  ],
};
interface SettingsProps {
  tab: string;
  onTabChange: (tab: string) => void;
}

const Settings: FC<SettingsProps> = ({tab, onTabChange}) => {
  const {entity} = useEntityDetailsPick('entity');
  return <SettingsLayout active={tab} onChange={onTabChange} tabs={tabsConfigMap[entity]} />;
};

export default Settings;
