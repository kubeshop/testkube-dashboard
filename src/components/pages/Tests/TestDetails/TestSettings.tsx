import React, {FC} from 'react';

import {SettingsLayout} from '@molecules/SettingsLayout';
import type {SettingsLayoutProps} from '@molecules/SettingsLayout';

import {Schedule as SettingsScheduling} from '@organisms/EntityDetails/Settings/SettingsScheduling/Schedule';

import {useUpdateTestMutation} from '@services/tests';

import {SettingsDefinition} from './TestSettings/SettingsDefinition';
import {SettingsExecution} from './TestSettings/SettingsExecution';
import {SettingsGeneral} from './TestSettings/SettingsGeneral';
import {SettingsTest} from './TestSettings/SettingsTest';
import {SettingsVariables} from './TestSettings/SettingsVariables';

const tabs = [
  {id: 'general', label: 'General', children: <SettingsGeneral />},
  {id: 'test', label: 'Test', children: <SettingsTest />},
  {id: 'execution', label: 'Execution', children: <SettingsExecution />},
  {id: 'variables', label: 'Variables & Secrets', children: <SettingsVariables />},
  {
    id: 'scheduling',
    label: 'Scheduling',
    children: <SettingsScheduling label="test" useUpdateEntity={useUpdateTestMutation} />,
  },
  {id: 'definition', label: 'Definition', children: <SettingsDefinition />},
];

type TestSettingsProps = Omit<SettingsLayoutProps, 'tabs'>;

export const TestSettings: FC<TestSettingsProps> = props => <SettingsLayout {...props} tabs={tabs} />;
