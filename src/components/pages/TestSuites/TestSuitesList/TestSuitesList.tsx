import {FC, useContext} from 'react';

import {EntityListContext, MainContext} from '@contexts';

import {EntityListContent} from '@organisms';

import {useAppSelector} from '@redux/hooks';
import {initialTestSuitesFiltersState} from '@redux/initialState';
import {
  selectAllTestSuitesFilters,
  selectTestSuites,
  selectTestSuitesFilters,
  setTestSuites,
  setTestSuitesFilters,
} from '@redux/reducers/testSuitesSlice';

import {useGetTestSuiteExecutionMetricsQuery} from '@services/testSuiteExecutions';
import {useAbortAllTestSuiteExecutionsMutation, useGetTestSuitesQuery} from '@services/testSuites';

import {PollingIntervals} from '@utils/numbers';

import EmptyTestSuites from './EmptyTestSuites';

const PageDescription: FC = () => <>Explore your test suites at a glance...</>;

const TestSuitesList: FC = () => {
  const {isClusterAvailable} = useContext(MainContext);
  const queryFilters = useAppSelector(selectTestSuitesFilters);

  const {data, isLoading, isFetching} = useGetTestSuitesQuery(queryFilters || null, {
    pollingInterval: PollingIntervals.everySecond,
    skip: !isClusterAvailable,
  });

  return (
    <EntityListContext.Provider
      value={{
        entity: 'test-suites',
        queryFilters,
        dataSource: useAppSelector(selectTestSuites),
        allFilters: useAppSelector(selectAllTestSuitesFilters),
        setQueryFilters: setTestSuitesFilters,
        useGetMetrics: useGetTestSuiteExecutionMetricsQuery,
        useAbortAllExecutions: useAbortAllTestSuiteExecutionsMutation,
      }}
    >
      <EntityListContent
        entity="test-suites"
        route="/dashboard/test-suites"
        reduxSliceName="testSuites"
        pageTitle="Test Suites"
        addEntityButtonText="Add a new test suite"
        pageDescription={PageDescription}
        emptyDataComponent={EmptyTestSuites}
        setData={setTestSuites}
        initialFiltersState={initialTestSuitesFiltersState}
        dataTestID="add-a-new-test-suite-btn"
        data={data || []}
        isLoading={isLoading}
        isFetching={isFetching}
      />
    </EntityListContext.Provider>
  );
};

export default TestSuitesList;
