import {FC, ReactNode} from 'react';

import {Tabs} from 'antd';

import {UseMutation} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import {MutationDefinition} from '@reduxjs/toolkit/query';

import {CLICommands, MetricsBarChart} from '@molecules';

import {ExecutionsTable} from '@organisms';

import {useEntityDetailsPick} from '@store/entityDetails';

import Colors from '@styles/Colors';

interface EntityDetailsTabsProps {
  settings: ReactNode;
  tab?: string;
  onTabChange: (tab: string) => void;
  onRun: () => void;
  useAbortExecution: UseMutation<MutationDefinition<any, any, any, any, any>>;
}

const EntityDetailsTabs: FC<EntityDetailsTabsProps> = ({settings, tab, onTabChange, onRun, useAbortExecution}) => {
  const {metrics, details} = useEntityDetailsPick('metrics', 'details');
  return (
    <Tabs
      activeKey={tab}
      onChange={onTabChange}
      destroyInactiveTabPane
      items={[
        {
          key: 'executions',
          label: 'Recent executions',
          children: (
            <>
              <MetricsBarChart
                data={metrics?.executions}
                isDetailsView
                executionDurationP50ms={metrics?.executionDurationP50ms}
                executionDurationP95ms={metrics?.executionDurationP95ms}
              />
              <ExecutionsTable onRun={onRun} useAbortExecution={useAbortExecution} />
            </>
          ),
        },
        {
          key: 'commands',
          label: 'CLI Commands',
          children: <CLICommands name={details!.name} bg={Colors.slate800} />,
        },
        {
          key: 'settings',
          label: 'Settings',
          children: settings,
        },
      ]}
    />
  );
};

export default EntityDetailsTabs;
