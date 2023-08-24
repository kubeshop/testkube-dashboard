import React, {FC} from 'react';

import {SettingsLayout} from '@molecules';
import {SettingsLayoutProps} from '@molecules/SettingsLayout/SettingsLayout';

import {SettingsScheduling} from '@organisms/EntityDetails';

import {useUpdateTestMutation} from '@services/tests';

import SettingsDefinition from './SettingsDefinition';
import SettingsExecution from './SettingsExecution';
import SettingsGeneral from './SettingsGeneral';
import SettingsTest from './SettingsTest';
import SettingsVariables from './SettingsVariables';

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

const TestSettings: FC<TestSettingsProps> = props => <SettingsLayout {...props} tabs={tabs} />;

export default TestSettings;
