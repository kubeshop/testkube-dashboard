import {FC, useMemo} from 'react';

import {EntityListContainer} from '@organisms';

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
  <EntityListContainer
    entity="test-suites"
    route="/dashboard/test-suites"
    reduxSliceName="testSuites"
    pageTitle="Test Suites"
    addEntityButtonText="Add a new test suite"
    pageDescription={PageDescription}
    emptyDataComponent={EmptyTestSuites}
    useGetData={useGetTestSuitesQuery}
    useGetMetrics={useGetTestSuiteExecutionMetricsQuery}
    useAbortAllExecutions={useAbortAllTestSuiteExecutionsMutation}
    setData={setTestSuites}
    selectData={selectTestSuites}
    setQueryFilters={setTestSuitesFilters}
    selectQueryFilters={selectTestSuitesFilters}
    selectAllFilters={selectAllTestSuitesFilters}
    initialFiltersState={initialTestSuitesFiltersState}
    filtersComponentsIds={useMemo(() => ['textSearch', 'selector', 'status'], [])}
    dataTestID="add-a-new-test-suite-btn"
  />
);

export default TestSuitesList;
