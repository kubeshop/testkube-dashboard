import {EntityListBlueprint} from '@models/entity';

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

import {EmptyTestSuitesListContent} from './EmptyEntitiesListContent';

const TestSuitesPageDescription: React.FC = () => {
  return <>Explore your test suites at a glance...</>;
};

export const TestSuitesEntity: EntityListBlueprint = {
  entity: 'test-suites',
  route: '/dashboard/test-suites',
  reduxSliceName: 'testSuites',
  pageTitle: 'Test Suites',
  addEntityButtonText: 'Add a new test suite',
  pageDescription: TestSuitesPageDescription,
  emptyDataComponent: EmptyTestSuitesListContent,

  useGetData: useGetTestSuitesQuery,
  useGetMetrics: useGetTestSuiteExecutionMetricsQuery,
  useAbortAllExecutions: useAbortAllTestSuiteExecutionsMutation,
  setData: setTestSuites,
  selectData: selectTestSuites,

  setQueryFilters: setTestSuitesFilters,
  selectQueryFilters: selectTestSuitesFilters,
  selectAllFilters: selectAllTestSuitesFilters,
  initialFiltersState: initialTestSuitesFiltersState,

  filtersComponentsIds: ['textSearch', 'selector', 'status'],
  dataTestID: 'add-a-new-test-suite-btn',
};

export default TestSuitesEntity;
