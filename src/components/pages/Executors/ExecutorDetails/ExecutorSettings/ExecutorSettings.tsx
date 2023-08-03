import {FC, memo} from 'react';

import {SettingsLayout} from '@molecules';

import CommandAndArguments from './CommandAndArguments';
import ContainerImage from './ContainerImage';
import ExecutorDefinition from './ExecutorDefinition';
import General from './General';

interface ExecutorSettingsProps {
  reload: () => void;
  tab: string;
  onTabChange: (tab: string) => void;
}

const ExecutorSettings: FC<ExecutorSettingsProps> = ({reload, tab, onTabChange}) => (
  <SettingsLayout
    active={tab}
    onChange={onTabChange}
    tabs={[
      {id: 'general', label: 'General', children: <General />},
      {id: 'image', label: 'Container image', children: <ContainerImage />},
      {id: 'command', label: 'Command & Arguments', children: <CommandAndArguments />},
      {id: 'definition', label: 'Definition', children: <ExecutorDefinition reload={reload} />},
    ]}
  />
);

export default memo(ExecutorSettings);
