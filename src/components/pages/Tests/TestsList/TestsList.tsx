import {FC, useCallback, useContext} from 'react';

import {ExternalLink} from '@atoms';

import {MainContext} from '@contexts';
import {ModalConfig} from '@contexts/ModalContext';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';

import {Test} from '@models/test';

import {notificationCall} from '@molecules';

import {EntityListContent} from '@organisms';

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

export const createModal: ModalConfig = {
  title: 'Create a test',
  width: 880,
  content: <TestCreationModalContent />,
  dataTestCloseBtn: 'add-a-new-test-modal-close-button',
  dataTestModalRoot: 'add-a-new-test-modal',
};

const TestsList: FC = () => {
  const {isClusterAvailable} = useContext(MainContext);
  const [filters, setFilters] = useTestsField('filters');

  const {
    data: tests,
    isLoading,
    isFetching,
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
      createModalConfig={createModal}
    />
  );
};

export default TestsList;
