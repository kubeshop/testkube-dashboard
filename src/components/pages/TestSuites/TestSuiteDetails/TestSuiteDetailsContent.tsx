import React, {FC, useContext} from 'react';

import {DashboardContext} from '@contexts';

import {useLastCallback} from '@hooks/useLastCallback';
import useRunEntity from '@hooks/useRunEntity';
import useTrackTimeAnalytics from '@hooks/useTrackTimeAnalytics';

import {SummaryGrid} from '@molecules';

import {PageWrapper} from '@organisms';
import {EntityDetailsHeader, EntityDetailsTabs, EntityDetailsWrapper} from '@organisms/EntityDetails';

import {Error, Loading} from '@pages';
import PageMetadata from '@pages/PageMetadata';

import {useAbortAllTestSuiteExecutionsMutation} from '@services/testSuites';
import {useAbortTestExecutionMutation} from '@services/tests';

import {useEntityDetailsPick} from '@store/entityDetails';

import TestSuiteExecutionDrawer from './TestSuiteExecution/TestSuiteExecutionDrawer';
import TestSuiteSettings from './TestSuiteSettings';

interface TestSuiteDetailsContentProps {
  tab?: string;
  settingsTab?: string;
}

const TestSuiteDetailsContent: FC<TestSuiteDetailsContentProps> = ({tab, settingsTab}) => {
  const {id, details, error, metrics} = useEntityDetailsPick('id', 'details', 'error', 'metrics');
  const [isRunning, run] = useRunEntity('test-suites', details);

  const {navigate} = useContext(DashboardContext);
  const setTab = useLastCallback((nextTab: string) => {
    navigate(`/test-suites/${id}/${nextTab}`);
  });
  const setSettingsTab = useLastCallback((nextTab: string) => {
    navigate(`/test-suites/${id}/settings/${nextTab}`);
  });

  useTrackTimeAnalytics('test-suites-details', tab !== 'settings');
  useTrackTimeAnalytics('test-suites-settings', tab === 'settings');

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
          onBack={() => navigate('/test-suites')}
          useAbortAllExecutions={useAbortAllTestSuiteExecutionsMutation}
        />
        <SummaryGrid metrics={metrics} />
        <EntityDetailsTabs
          tab={tab}
          onTabChange={setTab}
          onRun={run}
          settings={<TestSuiteSettings active={settingsTab} onChange={setSettingsTab} />}
          useAbortExecution={useAbortTestExecutionMutation}
        />
      </PageWrapper>
      <TestSuiteExecutionDrawer />
    </EntityDetailsWrapper>
  );
};

export default TestSuiteDetailsContent;
