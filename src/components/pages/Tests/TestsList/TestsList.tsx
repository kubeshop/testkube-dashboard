import {FC, useCallback} from 'react';

import {ExternalLink} from '@atoms';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';
import {SystemAccess, useSystemAccess} from '@hooks/useSystemAccess';

import {useModal} from '@modal/hooks';

import {Test} from '@models/test';

import {notificationCall} from '@molecules';

import {EntityListContent} from '@organisms';

import {Error} from '@pages';

import {useAbortAllTestExecutionsMutation, useGetTestsQuery} from '@services/tests';

import {initialFilters, useTestsField, useTestsSync} from '@store/tests';

import {externalLinks} from '@utils/externalLinks';
import {PollingIntervals} from '@utils/numbers';

import EmptyTests from './EmptyTests';
import TestCard from './TestCard';
import TestCreationModalContent from './TestCreationModalContent';

const PageDescription: FC = () => (
  <>
    Explore your tests at a glance... Learn more about{' '}
    <ExternalLink href={externalLinks.documentation}>testing with Testkube</ExternalLink>
  </>
);

const TestsList: FC = () => {
  const isAvailable = useSystemAccess(SystemAccess.agent);
  const [filters, setFilters] = useTestsField('filters');
  const [storeTests] = useTestsField('tests');
  const skip = !isAvailable && Boolean(storeTests);

  const {
    data: tests,
    isLoading,
    isFetching,
    error,
  } = useGetTestsQuery(filters, {
    pollingInterval: PollingIntervals.everySecond,
    skip,
  });
  useTestsSync({tests});

  const {open: openCreateModal} = useModal({
    title: 'Create a test',
    width: 880,
    content: <TestCreationModalContent />,
    dataTestCloseBtn: 'add-a-new-test-modal-close-button',
    dataTestModalRoot: 'add-a-new-test-modal',
  });

  const [abortAll] = useAbortAllTestExecutionsMutation();
  const onItemClick = useDashboardNavigate((item: Test) => `/tests/${item.name}`);
  const onItemAbort = useCallback((item: Test) => {
    abortAll({id: item.name})
      .unwrap()
      .catch(() => {
        notificationCall('failed', 'Something went wrong during test execution abortion');
      });
  }, []);

  if (error) {
    return <Error title={(error as any)?.data?.title} description={(error as any)?.data?.detail} />;
  }

  return (
    <EntityListContent
      itemKey="test.name"
      CardComponent={TestCard}
      onItemClick={onItemClick}
      onItemAbort={onItemAbort}
      entity="tests"
      pageTitle="Tests"
      addEntityButtonText="Add a new test"
      pageDescription={PageDescription}
      emptyDataComponent={EmptyTests}
      initialFiltersState={initialFilters}
      dataTest="add-a-new-test-btn"
      queryFilters={filters}
      setQueryFilters={setFilters}
      data={tests}
      isLoading={isLoading}
      isFetching={isFetching}
      onAdd={openCreateModal}
    />
  );
};

export default TestsList;
