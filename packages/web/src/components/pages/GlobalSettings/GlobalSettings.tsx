import {FC} from 'react';

import {SettingsLayout} from '@molecules';

import {PageBlueprint} from '@organisms';

import General from './General';

const tabs = [{id: 'general', label: 'General', children: <General />}];

const GlobalSettings: FC = () => (
  <PageBlueprint title="Settings" description="Control everything related to your testkube installation">
    <SettingsLayout tabs={tabs} />
  </PageBlueprint>
);

export default GlobalSettings;
