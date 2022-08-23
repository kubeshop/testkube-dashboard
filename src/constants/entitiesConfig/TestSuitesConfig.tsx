import {EntityListBlueprint} from '@models/entity';

import {initialTestSuitesFiltersState} from '@redux/initialState';
import {
  selectAllTestSuitesFilters,
  selectTestSuites,
  selectTestSuitesFilters,
  setSelectedTestSuite,
  setTestSuites,
  setTestSuitesFilters,
} from '@redux/reducers/testSuitesSlice';

import {Text} from '@custom-antd';

import {useGetTestSuiteExecutionMetricsQuery} from '@services/testSuiteExecutions';
import {useGetTestSuitesQuery} from '@services/testSuites';

import Colors from '@styles/Colors';

import {EmptyTestSuitesListContent} from './EmptyEntitiesListContent';

const TestSuitesPageDescription: React.FC = () => {
  return (
    <Text className="regular middle" color={Colors.slate400}>
      Explore your test suites at a glance...
    </Text>
  );
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
  setData: setTestSuites,
  selectData: selectTestSuites,

  setQueryFilters: setTestSuitesFilters,
  selectQueryFilters: selectTestSuitesFilters,
  selectAllFilters: selectAllTestSuitesFilters,
  initialFiltersState: initialTestSuitesFiltersState,
  setSelectedRecord: setSelectedTestSuite,

  filtersComponentsIds: ['textSearch', 'selector', 'status'],
};

export default TestSuitesEntity;
