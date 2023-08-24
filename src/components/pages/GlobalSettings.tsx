import {FC} from 'react';

import {SettingsLayout} from '@molecules/SettingsLayout';

import {PageBlueprint} from '@organisms/PageBlueprint';

import {GeneralSettings as General} from './GlobalSettings/General';

const tabs = [{id: 'general', label: 'General', children: <General />}];

export const GlobalSettings: FC = () => (
  <PageBlueprint title="Settings" description="Control everything related to your testkube installation">
    <SettingsLayout tabs={tabs} />
  </PageBlueprint>
);
