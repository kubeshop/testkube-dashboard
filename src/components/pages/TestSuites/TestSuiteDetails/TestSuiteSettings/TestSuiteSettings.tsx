import React, {FC} from 'react';

import {SettingsLayout} from '@molecules';
import {SettingsLayoutProps} from '@molecules/SettingsLayout/SettingsLayout';

import SettingsDefinition from '@organisms/EntityDetails/EntityDetailsContent/Settings/SettingsDefinition/SettingsDefinition';
import General from '@organisms/EntityDetails/EntityDetailsContent/Settings/SettingsGeneral/SettingsGeneral';
import SettingsScheduling from '@organisms/EntityDetails/EntityDetailsContent/Settings/SettingsScheduling';
import SettingsTests from '@organisms/EntityDetails/EntityDetailsContent/Settings/SettingsTests/SettingsTests';
import SettingsVariables from '@organisms/EntityDetails/EntityDetailsContent/Settings/SettingsVariables';

const tabs = [
  {id: 'general', label: 'General', children: <General />},
  {id: 'tests', label: 'Tests', children: <SettingsTests />},
  {id: 'variables', label: 'Variables & Secrets', children: <SettingsVariables />},
  {id: 'scheduling', label: 'Scheduling', children: <SettingsScheduling />},
  {id: 'definition', label: 'Definition', children: <SettingsDefinition />},
];

type TestSuiteSettingsProps = Omit<SettingsLayoutProps, 'tabs'>;

const TestSuiteSettings: FC<TestSuiteSettingsProps> = props => <SettingsLayout {...props} tabs={tabs} />;

export default TestSuiteSettings;
