import {FC, memo} from 'react';

import {SettingsLayout} from '@molecules/SettingsLayout';

import {CommandAndArguments} from './ExecutorSettings/CommandAndArguments';
import {ContainerImage} from './ExecutorSettings/ContainerImage';
import {ExecutorDefinition} from './ExecutorSettings/ExecutorDefinition';
import {General} from './ExecutorSettings/General';

interface ExecutorSettingsProps {
  tab: string;
  onTabChange: (tab: string) => void;
}

export const ExecutorSettings: FC<ExecutorSettingsProps> = memo(({tab, onTabChange}) => (
  <SettingsLayout
    active={tab}
    onChange={onTabChange}
    tabs={[
      {id: 'general', label: 'General', children: <General />},
      {id: 'image', label: 'Container image', children: <ContainerImage />},
      {id: 'command', label: 'Command & Arguments', children: <CommandAndArguments />},
      {id: 'definition', label: 'Definition', children: <ExecutorDefinition />},
    ]}
  />
));
