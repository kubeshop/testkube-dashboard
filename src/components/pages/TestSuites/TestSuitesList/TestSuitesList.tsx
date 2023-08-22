import {FC, useCallback, useContext} from 'react';

import {MainContext} from '@contexts';
import {ModalConfig} from '@contexts/ModalContext';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';

import {TestSuite} from '@models/testSuite';

import {notificationCall} from '@molecules';

import {EntityListContent} from '@organisms';

import {usePluginSlot} from '@plugins/hooks';

import {useAbortAllTestSuiteExecutionsMutation, useGetTestSuitesQuery} from '@services/testSuites';

import {initialFilters, useTestSuitesField, useTestSuitesSync} from '@store/testSuites';

import {PollingIntervals} from '@utils/numbers';

import EmptyTestSuites from './EmptyTestSuites';
import TestSuiteCard from './TestSuiteCard';
import TestSuiteCreationModalContent from './TestSuiteCreationModalContent';

const PageDescription: FC = () => <>Explore your test suites at a glance...</>;

const createModal: ModalConfig = {
  title: 'Create a test suite',
  width: 528,
  content: <TestSuiteCreationModalContent />,
  dataTestCloseBtn: 'add-a-new-test-suite-modal-close-button',
  dataTestModalRoot: 'add-a-new-test-suite-modal',
};

const TestSuitesList: FC = () => {
  const {isClusterAvailable} = useContext(MainContext);
  const [filters, setFilters] = useTestSuitesField('filters');

  const {
    data: testSuites,
    isLoading,
    isFetching,
  } = useGetTestSuitesQuery(filters || null, {
    pollingInterval: PollingIntervals.everySecond,
    skip: !isClusterAvailable,
  });
  useTestSuitesSync({testSuites});

  const [abortAll] = useAbortAllTestSuiteExecutionsMutation();
  const onItemClick = useDashboardNavigate((item: TestSuite) => `/test-suites/${item.name}`);
  const onItemAbort = useCallback((item: TestSuite) => {
    abortAll({id: item.name})
      .unwrap()
      .catch(() => {
        notificationCall('failed', 'Something went wrong during test suite execution abortion');
      });
  }, []);

  return (
    <EntityListContent
      itemKey="testSuite.name"
      CardComponent={TestSuiteCard}
      onItemClick={onItemClick}
      onItemAbort={onItemAbort}
      entity="test-suites"
      pageTitle="Test Suites"
      pageTitleAddon={usePluginSlot('testSuitesListTitleAddon')}
      addEntityButtonText="Add a new test suite"
      pageDescription={PageDescription}
      emptyDataComponent={EmptyTestSuites}
      initialFiltersState={initialFilters}
      dataTest="add-a-new-test-suite-btn"
      queryFilters={filters}
      setQueryFilters={setFilters}
      data={testSuites}
      isLoading={isLoading}
      isFetching={isFetching}
      createModalConfig={createModal}
    />
  );
};

export default TestSuitesList;
