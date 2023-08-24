import {FC, useCallback, useContext} from 'react';

import {ExternalLink} from '@atoms/ExternalLink';

import {MainContext} from '@contexts/MainContext';
import type {ModalConfig} from '@contexts/ModalContext';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';

import type {Test} from '@models/test';

import {notificationCall} from '@molecules/Notification';

import {EntityListContent} from '@organisms/EntityList/EntityListContent';

import {Error} from '@pages/Error';

import {useAbortAllTestExecutionsMutation, useGetTestsQuery} from '@services/tests';

import {initialFilters, useTestsField, useTestsSync} from '@store/tests';

import {externalLinks} from '@utils/externalLinks';
import {PollingIntervals} from '@utils/numbers';

import {EmptyTests} from './TestsList/EmptyTests';
import {TestCard} from './TestsList/TestCard';
import {TestCreationModalContent} from './TestsList/TestCreationModalContent';

const PageDescription: FC = () => (
  <>
    Explore your tests at a glance... Learn more about{' '}
    <ExternalLink href={externalLinks.documentation}>testing with Testkube</ExternalLink>
  </>
);

export const createModal: ModalConfig = {
  title: 'Create a test',
  width: 880,
  content: <TestCreationModalContent />,
  dataTestCloseBtn: 'add-a-new-test-modal-close-button',
  dataTestModalRoot: 'add-a-new-test-modal',
};

export const TestsList: FC = () => {
  const {isClusterAvailable} = useContext(MainContext);
  const [filters, setFilters] = useTestsField('filters');

  const {
    data: tests,
    isLoading,
    isFetching,
    error,
  } = useGetTestsQuery(filters, {
    pollingInterval: PollingIntervals.everySecond,
    skip: !isClusterAvailable,
  });
  useTestsSync({tests});

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
      isLoading={isLoading || !isClusterAvailable}
      isFetching={isFetching}
      createModalConfig={createModal}
    />
  );
};
