import {FC, useCallback, useContext, useEffect} from 'react';

import {MainContext} from '@contexts';
import {ModalConfig} from '@contexts/ModalContext';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';
import {useLastCallback} from '@hooks/useLastCallback';

import {TestSuite, TestSuiteFilters} from '@models/testSuite';

import {notificationCall} from '@molecules';

import {EntityListContent} from '@organisms';

import {usePluginSlot} from '@plugins/hooks';

import {useAppSelector} from '@redux/hooks';
import {initialTestSuitesFiltersState} from '@redux/initialState';
import {
  selectTestSuites,
  selectTestSuitesFilters,
  setTestSuites,
  setTestSuitesFilters,
} from '@redux/reducers/testSuitesSlice';

import {useAbortAllTestSuiteExecutionsMutation, useGetTestSuitesQuery} from '@services/testSuites';

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
  const {dispatch, isClusterAvailable} = useContext(MainContext);
  const queryFilters = useAppSelector(selectTestSuitesFilters);
  const setQueryFilters = useLastCallback((filters: TestSuiteFilters) => dispatch(setTestSuitesFilters(filters)));

  const {data, isLoading, isFetching} = useGetTestSuitesQuery(queryFilters || null, {
    pollingInterval: PollingIntervals.everySecond,
    skip: !isClusterAvailable,
  });

  useEffect(() => {
    dispatch(setTestSuites(data || []));
  }, [data]);

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
      itemKey="dataItem.name"
      CardComponent={TestSuiteCard}
      onItemClick={onItemClick}
      onItemAbort={onItemAbort}
      entity="test-suites"
      pageTitle="Test Suites"
      pageTitleAddon={usePluginSlot('testSuitesListTitleAddon')}
      addEntityButtonText="Add a new test suite"
      pageDescription={PageDescription}
      emptyDataComponent={EmptyTestSuites}
      initialFiltersState={initialTestSuitesFiltersState}
      dataTest="add-a-new-test-suite-btn"
      queryFilters={queryFilters}
      setQueryFilters={setQueryFilters}
      data={useAppSelector(selectTestSuites)}
      isLoading={isLoading}
      isFetching={isFetching}
      createModalConfig={createModal}
    />
  );
};

export default TestSuitesList;
