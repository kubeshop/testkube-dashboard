import React, {FC} from 'react';

import {Tabs} from 'antd';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';
import useRunEntity from '@hooks/useRunEntity';
import useTrackTimeAnalytics from '@hooks/useTrackTimeAnalytics';

import {CLICommands, SummaryGrid} from '@molecules';

import {PageWrapper} from '@organisms';
import {EntityDetailsHeader, EntityDetailsWrapper, RecentExecutionsTab} from '@organisms/EntityDetails';

import {Error, Loading} from '@pages';
import PageMetadata from '@pages/PageMetadata';

import {useAbortAllTestExecutionsMutation, useAbortTestExecutionMutation} from '@services/tests';

import {useEntityDetailsPick} from '@store/entityDetails';

import Colors from '@styles/Colors';

import TestExecutionDrawer from './TestExecution/TestExecutionDrawer';
import TestSettings from './TestSettings';

interface TestDetailsContentProps {
  tab?: string;
  settingsTab?: string;
}

const TestDetailsContent: FC<TestDetailsContentProps> = ({tab, settingsTab}) => {
  const {id, details, error, metrics} = useEntityDetailsPick('id', 'details', 'error', 'metrics');
  const [isRunning, run] = useRunEntity('tests', details);

  const setTab = useDashboardNavigate((next: string) => `/tests/${id}/${next}`);
  const setSettingsTab = useDashboardNavigate((next: string) => `/tests/${id}/settings/${next}`);
  const back = useDashboardNavigate('/tests');

  useTrackTimeAnalytics('tests-details', tab !== 'settings');
  useTrackTimeAnalytics('tests-settings', tab === 'settings');

  if (error) {
    return <Error title={error?.data?.title || 'Error'} description={error?.data?.detail || ''} />;
  }
  if (!details) {
    return <Loading />;
  }

  return (
    <EntityDetailsWrapper>
      <PageWrapper>
        <PageMetadata title={details?.name} description={details?.description} />

        <EntityDetailsHeader
          isRunning={isRunning}
          onRun={run}
          onBack={back}
          useAbortAllExecutions={useAbortAllTestExecutionsMutation}
        />
        <SummaryGrid metrics={metrics} />
        <Tabs
          activeKey={tab}
          onChange={setTab}
          destroyInactiveTabPane
          items={[
            {
              key: 'executions',
              label: 'Recent executions',
              children: <RecentExecutionsTab onRun={run} useAbortExecution={useAbortTestExecutionMutation} />,
            },
            {
              key: 'commands',
              label: 'CLI Commands',
              children: <CLICommands name={details!.name} bg={Colors.slate800} />,
            },
            {
              key: 'settings',
              label: 'Settings',
              children: <TestSettings active={settingsTab} onChange={setSettingsTab} />,
            },
          ]}
        />
      </PageWrapper>
      <TestExecutionDrawer />
    </EntityDetailsWrapper>
  );
};

export default TestDetailsContent;
