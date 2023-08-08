import React, {FC} from 'react';

import {SettingsLayout} from '@molecules';
import {SettingsLayoutProps} from '@molecules/SettingsLayout/SettingsLayout';

import {SettingsScheduling} from '@organisms/EntityDetails';

import SettingsDefinition from './SettingsDefinition';
import SettingsGeneral from './SettingsGeneral';
import SettingsTests from './SettingsTests';
import SettingsVariables from './SettingsVariables';

const tabs = [
  {id: 'general', label: 'General', children: <SettingsGeneral />},
  {id: 'tests', label: 'Tests', children: <SettingsTests />},
  {id: 'variables', label: 'Variables & Secrets', children: <SettingsVariables />},
  {id: 'scheduling', label: 'Scheduling', children: <SettingsScheduling />},
  {id: 'definition', label: 'Definition', children: <SettingsDefinition />},
];

type TestSuiteSettingsProps = Omit<SettingsLayoutProps, 'tabs'>;

const TestSuiteSettings: FC<TestSuiteSettingsProps> = props => <SettingsLayout {...props} tabs={tabs} />;

export default TestSuiteSettings;
