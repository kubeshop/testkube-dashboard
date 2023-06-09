import {FC, useContext, useEffect} from 'react';

import {MainContext} from '@contexts';
import {ModalConfig} from '@contexts/ModalContext';

import {EntityListContent} from '@organisms';

import {useAppSelector} from '@redux/hooks';
import {initialTestSuitesFiltersState} from '@redux/initialState';
import {
  selectTestSuites,
  selectTestSuitesFilters,
  setTestSuites,
  setTestSuitesFilters,
} from '@redux/reducers/testSuitesSlice';

import {useGetTestSuitesQuery} from '@services/testSuites';

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

  const {data, isLoading, isFetching} = useGetTestSuitesQuery(queryFilters || null, {
    pollingInterval: PollingIntervals.everySecond,
    skip: !isClusterAvailable,
  });

  useEffect(() => {
    dispatch(setTestSuites(data || []));
  }, [data]);

  return (
    <EntityListContent
      CardComponent={TestSuiteCard}
      entity="test-suites"
      pageTitle="Test Suites"
      addEntityButtonText="Add a new test suite"
      pageDescription={PageDescription}
      emptyDataComponent={EmptyTestSuites}
      initialFiltersState={initialTestSuitesFiltersState}
      dataTest="add-a-new-test-suite-btn"
      queryFilters={queryFilters}
      setQueryFilters={setTestSuitesFilters}
      data={useAppSelector(selectTestSuites)}
      isLoading={isLoading}
      isFetching={isFetching}
      createModalConfig={createModal}
    />
  );
};

export default TestSuitesList;
