import React, {FC, useMemo} from 'react';

import {Tabs} from 'antd';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';
import {useLastCallback} from '@hooks/useLastCallback';
import useRunEntity from '@hooks/useRunEntity';
import {SystemAccess, useSystemAccess} from '@hooks/useSystemAccess';
import useTrackTimeAnalytics from '@hooks/useTrackTimeAnalytics';

import {Entity} from '@models/entity';

import {CLICommands, SummaryGrid} from '@molecules';

import {PageWrapper} from '@organisms';
import {EntityDetailsHeader, EntityDetailsWrapper, RecentExecutionsTab} from '@organisms/EntityDetails';

import {Error, Loading} from '@pages';
import PageMetadata from '@pages/PageMetadata';

import {useTestsSlot} from '@plugins/tests-and-test-suites/hooks';

import {useAbortAllTestSuiteExecutionsMutation, useAbortTestSuiteExecutionMutation} from '@services/testSuites';

import {useEntityDetailsPick} from '@store/entityDetails';

import Colors from '@styles/Colors';

import TestSuiteExecutionDrawer from './TestSuiteExecution/TestSuiteExecutionDrawer';
import TestSuiteSettings from './TestSuiteSettings';

interface TestSuiteDetailsContentProps {
  entity: Entity;
  tab?: string;
  settingsTab?: string;
}

const TestSuiteDetailsContent: FC<TestSuiteDetailsContentProps> = ({entity, tab, settingsTab}) => {
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

  const defaultTabs = useMemo(
    () => [
      {
        value: {
          key: 'executions',
          label: 'Recent executions',
          children: <RecentExecutionsTab onRun={run} useAbortExecution={useAbortTestSuiteExecutionMutation} />,
        },
        metadata: {order: -Infinity},
      },
      {
        value: {
          key: 'commands',
          label: 'CLI Commands',
          children: <CLICommands name={details?.name!} bg={Colors.slate800} />,
        },
        metadata: {order: -100},
      },
      {
        value: {
          key: 'settings',
          label: 'Settings',
          children: <TestSuiteSettings active={settingsTab} onChange={setSettingsTab} />,
        },
        metadata: {order: 50},
      },
    ],
    [details, run, settingsTab, setSettingsTab]
  );
  const tabs = useTestsSlot('testSuiteDetailsTabs', defaultTabs);

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
          entity={entity}
          isRunning={isRunning}
          outOfSync={details.readOnly}
          isAgentAvailable={isAgentAvailable}
          onRun={run}
          onBack={back}
          useAbortAllExecutions={useAbortAllTestSuiteExecutionsMutation}
          onEditTest={onEditTest}
          entityLabel="test suite"
        />
        <SummaryGrid metrics={metrics} />
        <Tabs activeKey={tab} onChange={setTab} destroyInactiveTabPane items={tabs} />
      </PageWrapper>
      <TestSuiteExecutionDrawer />
    </EntityDetailsWrapper>
  );
};

export default TestSuiteDetailsContent;
