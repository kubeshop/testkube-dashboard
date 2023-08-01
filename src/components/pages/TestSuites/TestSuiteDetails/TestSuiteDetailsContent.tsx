import React, {FC} from 'react';

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

const TestSuiteDetailsContent: FC = () => {
  const {entity, details, metrics} = useEntityDetailsPick('entity', 'details', 'metrics');

  const name = details?.name;
  const description = details?.description;
  const [isRunning, run] = useRunEntity(entity, details);

  return (
    <EntityDetailsWrapper>
      <PageWrapper>
        <PageMetadata title={name} description={description} />

        <EntityDetailsContentHeader onRun={run} isRunning={isRunning} />
        <SummaryGrid metrics={metrics} />
        <EntityDetailsContentTabs
          onRun={run}
          settings={<TestSuiteSettings />}
        />
      </PageWrapper>
      <TestSuiteExecutionDetailsDrawer />
    </EntityDetailsWrapper>
  );
};

export default TestSuiteDetailsContent;
