import {FC, memo} from 'react';

import {SettingsLayout} from '@molecules/SettingsLayout';

import {SourceSettingsDefinition} from './SourceSettings/Definition/SourceSettingsDefinition';
import {General} from './SourceSettings/General';

interface SourceSettingsProps {
  tab: string;
  onTabChange: (tab: string) => void;
}

export const SourceSettings: FC<SourceSettingsProps> = memo(({tab, onTabChange}) => (
  <SettingsLayout
    active={tab}
    onChange={onTabChange}
    tabs={[
      {id: 'general', label: 'General', children: <General />},
      {id: 'definition', label: 'Definition', children: <SourceSettingsDefinition />},
    ]}
  />
));
