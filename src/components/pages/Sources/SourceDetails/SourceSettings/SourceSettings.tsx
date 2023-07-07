import {memo} from 'react';

import {SettingsLayout} from '@molecules';

import SourceSettingsDefinition from './Definition';
import General from './General';

const SourceSettings = () => (
  <SettingsLayout
    tabs={[
      {id: 'general', label: 'General', children: <General />},
      {id: 'definition', label: 'Definition', children: <SourceSettingsDefinition />},
    ]}
  />
);

export default memo(SourceSettings);
