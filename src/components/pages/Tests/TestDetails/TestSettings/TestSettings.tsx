import React, {FC} from 'react';

import {SettingsLayout} from '@molecules';

import SettingsDefinition from '@organisms/EntityDetails/EntityDetailsContent/Settings/SettingsDefinition/SettingsDefinition';
import SettingsExecution from '@organisms/EntityDetails/EntityDetailsContent/Settings/SettingsExecution';
import General from '@organisms/EntityDetails/EntityDetailsContent/Settings/SettingsGeneral/SettingsGeneral';
import SettingsScheduling from '@organisms/EntityDetails/EntityDetailsContent/Settings/SettingsScheduling';
import SettingsTest from '@organisms/EntityDetails/EntityDetailsContent/Settings/SettingsTest';
import SettingsVariables from '@organisms/EntityDetails/EntityDetailsContent/Settings/SettingsVariables';

const tabs = [
  {id: 'general', label: 'General', children: <General />},
  {id: 'test', label: 'Test', children: <SettingsTest />},
  {id: 'execution', label: 'Execution', children: <SettingsExecution />},
  {id: 'variables', label: 'Variables & Secrets', children: <SettingsVariables />},
  {id: 'scheduling', label: 'Scheduling', children: <SettingsScheduling />},
  {id: 'definition', label: 'Definition', children: <SettingsDefinition />},
];

const TestSettings: FC = () => <SettingsLayout tabs={tabs} />;

export default TestSettings;
