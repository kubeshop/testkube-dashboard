import {FC, memo} from 'react';

import {SettingsLayout} from '@molecules';

import SourceSettingsDefinition from './Definition';
import General from './General';

interface SourceSettingsProps {
  reload: () => void;
  tab: string;
  onTabChange: (tab: string) => void;
}

const SourceSettings: FC<SourceSettingsProps> = ({reload, tab, onTabChange}) => (
  <SettingsLayout
    active={tab}
    onChange={onTabChange}
    tabs={[
      {id: 'general', label: 'General', children: <General />},
      {id: 'definition', label: 'Definition', children: <SourceSettingsDefinition reload={reload} />},
    ]}
  />
);

export default memo(SourceSettings);
