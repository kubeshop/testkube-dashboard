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

import TestExecutionDrawer from './TestExecutionDrawer';
import TestSettings from './TestSettings';

interface TestDetailsContentProps {
  tab?: string;
  settingsTab?: string;
}

const TestDetailsContent: FC<TestDetailsContentProps> = ({tab, settingsTab}) => {
  const {id, details, error, metrics} = useEntityDetailsPick('id', 'details', 'error', 'metrics');
  const [isRunning, run] = useRunEntity('tests', details);

  const {navigate} = useContext(DashboardContext);
  const setTab = useLastCallback((nextTab: string) => {
    navigate(`/tests/${id}/${nextTab}`);
  });
  const setSettingsTab = useLastCallback((nextTab: string) => {
    navigate(`/tests/${id}/settings/${nextTab}`);
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
          settings={<TestSettings active={settingsTab} onChange={setSettingsTab} />}
        />
      </PageWrapper>
      <TestExecutionDrawer />
    </EntityDetailsWrapper>
  );
};

export default TestDetailsContent;