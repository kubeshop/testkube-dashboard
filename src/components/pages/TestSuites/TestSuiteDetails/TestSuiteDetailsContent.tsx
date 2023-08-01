import React, {FC, useContext} from 'react';

import {DashboardContext} from '@contexts';

import {useLastCallback} from '@hooks/useLastCallback';
import useRunEntity from '@hooks/useRunEntity';

import {PageWrapper} from '@organisms';
import {EntityDetailsWrapper} from '@organisms/EntityDetails/EntityDetailsContainer/EntityDetailsContainer.styled';
import EntityDetailsContentHeader from '@organisms/EntityDetails/EntityDetailsContent/EntityDetailsContentHeader';
import EntityDetailsContentTabs from '@organisms/EntityDetails/EntityDetailsContent/EntityDetailsContentTabs';
import SummaryGrid from '@organisms/EntityDetails/EntityDetailsContent/SummaryGrid';

import PageMetadata from '@pages/PageMetadata';

import {useEntityDetailsPick} from '@store/entityDetails';

import TestSuiteExecutionDetailsDrawer from './TestSuiteExecutionDetailsDrawer';
import TestSuiteSettings from './TestSuiteSettings';

interface TestSuiteDetailsContentProps {
  tab?: string;
}

const TestSuiteDetailsContent: FC<TestSuiteDetailsContentProps> = ({tab}) => {
  const {id, entity, details, metrics} = useEntityDetailsPick('id', 'entity', 'details', 'metrics');
  const [isRunning, run] = useRunEntity(entity, details);

  const {navigate} = useContext(DashboardContext);
  const setTab = useLastCallback((nextTab: string) => {
    navigate(`/test-suites/${id}/${nextTab}`);
  });

  return (
    <EntityDetailsWrapper>
      <PageWrapper>
        <PageMetadata title={details?.name} description={details?.description} />

        <EntityDetailsContentHeader onRun={run} isRunning={isRunning} />
        <SummaryGrid metrics={metrics} />
        <EntityDetailsContentTabs tab={tab} onTabChange={setTab} onRun={run} settings={<TestSuiteSettings />} />
      </PageWrapper>
      <TestSuiteExecutionDetailsDrawer />
    </EntityDetailsWrapper>
  );
};

export default TestSuiteDetailsContent;
