import {FC, useCallback} from 'react';
import {useUnmount} from 'react-use';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';
import {SystemAccess, useSystemAccess} from '@hooks/useSystemAccess';

import {useModal} from '@modal/hooks';

import {TestSuite} from '@models/testSuite';

import {notificationCall} from '@molecules';

import {EntityListContent} from '@organisms';

import {Error} from '@pages';

import {useTestsSlotFirst} from '@plugins/tests-and-test-suites/hooks';

import {useAbortAllTestSuiteExecutionsMutation, useGetTestSuitesQuery} from '@services/testSuites';

import {initialFilters, useTestSuitesField, useTestSuitesSync} from '@store/testSuites';

import {PollingIntervals} from '@utils/numbers';

import EmptyTestSuites from './EmptyTestSuites';
import TestSuiteCard from './TestSuiteCard';
import TestSuiteCreationModalContent from './TestSuiteCreationModalContent';

const PageDescription: FC = () => <>Explore your test suites at a glance...</>;

const TestSuitesList: FC = () => {
  const isSystemAvailable = useSystemAccess(SystemAccess.system);
  const [filters, setFilters] = useTestSuitesField('filters');
  const pageTitleAddon = useTestsSlotFirst('testSuitesListTitleAddon');

  useUnmount(() => {
    setFilters({...filters, pageSize: initialFilters.pageSize});
  });

  const {
    data: testSuites,
    error,
    isLoading,
    isFetching,
  } = useGetTestSuitesQuery(filters || null, {
    pollingInterval: PollingIntervals.everySecond,
    skip: !isSystemAvailable,
  });
  useTestSuitesSync({testSuites});

  const {open: openCreateModal} = useModal({
    title: 'Create a test suite',
    width: 528,
    content: <TestSuiteCreationModalContent />,
    dataTestCloseBtn: 'add-a-new-test-suite-modal-close-button',
    dataTestModalRoot: 'add-a-new-test-suite-modal',
  });

  const [abortAll] = useAbortAllTestSuiteExecutionsMutation();
  const onItemClick = useDashboardNavigate((item: TestSuite) => `/test-suites/${item.name}`);
  const onItemAbort = useCallback((item: TestSuite) => {
    abortAll({id: item.name})
      .unwrap()
      .catch(() => {
        notificationCall('failed', 'Something went wrong during test suite execution abortion');
      });
  }, []);

  if (error) {
    return <Error title={(error as any)?.data?.title} description={(error as any)?.data?.detail} />;
  }

  return (
    <EntityListContent
      itemKey="testSuite.name"
      CardComponent={TestSuiteCard}
      onItemClick={onItemClick}
      onItemAbort={onItemAbort}
      entity="test-suites"
      pageTitle="Test Suites"
      pageTitleAddon={pageTitleAddon}
      addEntityButtonText="Add a new test suite"
      pageDescription={PageDescription}
      emptyDataComponent={EmptyTestSuites}
      initialFiltersState={initialFilters}
      dataTest="add-a-new-test-suite-btn"
      queryFilters={filters}
      setQueryFilters={setFilters}
      data={testSuites}
      isLoading={isLoading || !isSystemAvailable}
      isFetching={isFetching}
      onAdd={openCreateModal}
    />
  );
};

export default TestSuitesList;
