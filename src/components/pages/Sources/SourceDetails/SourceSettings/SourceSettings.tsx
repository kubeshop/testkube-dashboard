import {FC, memo} from 'react';

import {SettingsLayout} from '@molecules';

import SourceSettingsDefinition from './Definition';
import General from './General';

interface SourceSettingsProps {
  tab: string;
  onTabChange: (tab: string) => void;
}

const SourceSettings: FC<SourceSettingsProps> = ({tab, onTabChange}) => (
  <SettingsLayout
    active={tab}
    onChange={onTabChange}
    tabs={[
      {id: 'general', label: 'General', children: <General />},
      {id: 'definition', label: 'Definition', children: <SourceSettingsDefinition />},
    ]}
  />
);

export default memo(SourceSettings);
