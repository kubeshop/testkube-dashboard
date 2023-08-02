import React, {FC} from 'react';

import {SettingsLayout} from '@molecules';
import {SettingsLayoutProps} from '@molecules/SettingsLayout/SettingsLayout';

import SettingsDefinition from '@organisms/EntityDetails/EntityDetailsContent/Settings/SettingsDefinition/SettingsDefinition';
import General from '@organisms/EntityDetails/EntityDetailsContent/Settings/SettingsGeneral';
import SettingsScheduling from '@organisms/EntityDetails/EntityDetailsContent/Settings/SettingsScheduling';
import SettingsVariables from '@organisms/EntityDetails/EntityDetailsContent/Settings/SettingsVariables';

import SettingsExecution from './SettingsExecution';
import SettingsTest from './SettingsTest';

const tabs = [
  {id: 'general', label: 'General', children: <General />},
  {id: 'test', label: 'Test', children: <SettingsTest />},
  {id: 'execution', label: 'Execution', children: <SettingsExecution />},
  {id: 'variables', label: 'Variables & Secrets', children: <SettingsVariables />},
  {id: 'scheduling', label: 'Scheduling', children: <SettingsScheduling />},
  {id: 'definition', label: 'Definition', children: <SettingsDefinition />},
];

type TestSettingsProps = Omit<SettingsLayoutProps, 'tabs'>;

const TestSettings: FC<TestSettingsProps> = props => <SettingsLayout {...props} tabs={tabs} />;

export default TestSettings;
