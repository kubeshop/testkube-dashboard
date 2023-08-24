import React, {FC} from 'react';

import {SettingsLayout} from '@molecules/SettingsLayout';
import type {SettingsLayoutProps} from '@molecules/SettingsLayout';

import {Schedule as SettingsScheduling} from '@organisms/EntityDetails/Settings/SettingsScheduling/Schedule';

import {useUpdateTestSuiteMutation} from '@services/testSuites';

import {SettingsDefinition} from './TestSuiteSettings/SettingsDefinition';
import {SettingsGeneral} from './TestSuiteSettings/SettingsGeneral';
import {SettingsTests} from './TestSuiteSettings/SettingsTests';
import {SettingsVariables} from './TestSuiteSettings/SettingsVariables';

const tabs = [
  {id: 'general', label: 'General', children: <SettingsGeneral />},
  {id: 'tests', label: 'Tests', children: <SettingsTests />},
  {id: 'variables', label: 'Variables & Secrets', children: <SettingsVariables />},
  {
    id: 'scheduling',
    label: 'Scheduling',
    children: <SettingsScheduling label="test suite" useUpdateEntity={useUpdateTestSuiteMutation} />,
  },
  {id: 'definition', label: 'Definition', children: <SettingsDefinition />},
];

type TestSuiteSettingsProps = Omit<SettingsLayoutProps, 'tabs'>;

export const TestSuiteSettings: FC<TestSuiteSettingsProps> = props => <SettingsLayout {...props} tabs={tabs} />;
