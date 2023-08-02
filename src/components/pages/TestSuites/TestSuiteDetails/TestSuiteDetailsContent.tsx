import React, {FC, useContext} from 'react';

import {DashboardContext} from '@contexts';

import {useLastCallback} from '@hooks/useLastCallback';
import useRunEntity from '@hooks/useRunEntity';

import {PageWrapper} from '@organisms';
import {EntityDetailsWrapper} from '@organisms/EntityDetails/EntityDetailsContainer/EntityDetailsContainer.styled';
import EntityDetailsContentHeader from '@organisms/EntityDetails/EntityDetailsContent/EntityDetailsContentHeader';
import EntityDetailsContentTabs from '@organisms/EntityDetails/EntityDetailsContent/EntityDetailsContentTabs';
import SummaryGrid from '@organisms/EntityDetails/EntityDetailsContent/SummaryGrid';

import {Error, Loading} from '@pages';
import PageMetadata from '@pages/PageMetadata';

import {useEntityDetailsPick} from '@store/entityDetails';

import TestSuiteExecutionDrawer from './TestSuiteExecutionDrawer';
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

        <EntityDetailsContentHeader onRun={run} isRunning={isRunning} />
        <SummaryGrid metrics={metrics} />
        <EntityDetailsContentTabs
          tab={tab}
          onTabChange={setTab}
          onRun={run}
          settings={<TestSuiteSettings active={settingsTab} onChange={setSettingsTab} />}
        />
      </PageWrapper>
      <TestSuiteExecutionDrawer />
    </EntityDetailsWrapper>
  );
};

export default TestSuiteDetailsContent;
