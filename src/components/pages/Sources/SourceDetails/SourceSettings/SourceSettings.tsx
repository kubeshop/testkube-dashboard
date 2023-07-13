import {FC, memo} from 'react';

import {SettingsLayout} from '@molecules';

import SourceSettingsDefinition from './Definition';
import General from './General';

interface SourceSettingsProps {
  reload: () => void;
}

const SourceSettings: FC<SourceSettingsProps> = ({reload}) => (
  <SettingsLayout
    tabs={[
      {id: 'general', label: 'General', children: <General />},
      {id: 'definition', label: 'Definition', children: <SourceSettingsDefinition reload={reload} />},
    ]}
  />
);

export default memo(SourceSettings);
