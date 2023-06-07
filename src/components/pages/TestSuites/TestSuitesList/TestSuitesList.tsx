import {FC} from 'react';

import {EntityListContext} from '@contexts';

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

import EmptyTestSuites from './EmptyTestSuites';

const PageDescription: FC = () => <>Explore your test suites at a glance...</>;

const TestSuitesList: FC = () => (
  <EntityListContext.Provider
    value={{
      entity: 'test-suites',
      dataSource: useAppSelector(selectTestSuites),
      queryFilters: useAppSelector(selectTestSuitesFilters),
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
      useGetData={useGetTestSuitesQuery}
      setData={setTestSuites}
      initialFiltersState={initialTestSuitesFiltersState}
      dataTestID="add-a-new-test-suite-btn"
    />
  </EntityListContext.Provider>
);

export default TestSuitesList;
