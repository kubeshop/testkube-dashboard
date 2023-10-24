import React, {FC} from 'react';

import {Tabs} from 'antd';

import {Tab} from 'rc-tabs/lib/interface';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';
import {useLastCallback} from '@hooks/useLastCallback';
import useRunEntity from '@hooks/useRunEntity';
import {SystemAccess, useSystemAccess} from '@hooks/useSystemAccess';
import useTrackTimeAnalytics from '@hooks/useTrackTimeAnalytics';

import {CLICommands, SummaryGrid} from '@molecules';

import {PageWrapper} from '@organisms';
import {EntityDetailsHeader, EntityDetailsWrapper, RecentExecutionsTab} from '@organisms/EntityDetails';

import {Error, Loading} from '@pages';
import PageMetadata from '@pages/PageMetadata';

import {useAbortAllTestSuiteExecutionsMutation, useAbortTestSuiteExecutionMutation} from '@services/testSuites';

import {useEntityDetailsPick} from '@store/entityDetails';

import Colors from '@styles/Colors';

import TestSuiteExecutionDrawer from './TestSuiteExecution/TestSuiteExecutionDrawer';
import TestSuiteSettings from './TestSuiteSettings';

interface TestSuiteDetailsContentProps {
  tab?: string;
  settingsTab?: string;
}

const TestSuiteDetailsContent: FC<TestSuiteDetailsContentProps> = ({tab, settingsTab}) => {
  const {id, details, error, metrics} = useEntityDetailsPick('id', 'details', 'error', 'metrics');
  const [isRunning, run] = useRunEntity('test-suites', details);
  const isAgentAvailable = useSystemAccess(SystemAccess.agent);

  const setTab = useDashboardNavigate((next: string) => `/test-suites/${id}/${next}`);
  const setSettingsTab = useDashboardNavigate((next: string) => `/test-suites/${id}/settings/${next}`);
  const back = useDashboardNavigate('/test-suites');

  useTrackTimeAnalytics('test-suites-details', tab !== 'settings');
  useTrackTimeAnalytics('test-suites-settings', tab === 'settings');

  const onEditTest = useLastCallback(() => {
    setSettingsTab('tests');
  });

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
          outOfSync={details.readOnly}
          isAgentAvailable={isAgentAvailable}
          onRun={run}
          onBack={back}
          useAbortAllExecutions={useAbortAllTestSuiteExecutionsMutation}
          onEditTest={onEditTest}
        />
        <SummaryGrid metrics={metrics} />
        <Tabs
          activeKey={tab}
          onChange={setTab}
          destroyInactiveTabPane
          items={
            [
              {
                key: 'executions',
                label: 'Recent executions',
                children: <RecentExecutionsTab onRun={run} useAbortExecution={useAbortTestSuiteExecutionMutation} />,
              },
              !details.readOnly && {
                key: 'commands',
                label: 'CLI Commands',
                children: <CLICommands name={details!.name} bg={Colors.slate800} />,
              },
              {
                key: 'settings',
                label: 'Settings',
                children: <TestSuiteSettings active={settingsTab} onChange={setSettingsTab} />,
              },
            ].filter(Boolean) as Tab[]
          }
        />
      </PageWrapper>
      <TestSuiteExecutionDrawer />
    </EntityDetailsWrapper>
  );
};

export default TestSuiteDetailsContent;
