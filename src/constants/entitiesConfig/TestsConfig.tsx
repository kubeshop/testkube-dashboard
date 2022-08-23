import {EntityListBlueprint} from '@models/entity';

import {initialTestsFiltersState} from '@redux/initialState';
import {
  selectAllTestsFilters,
  selectTests,
  selectTestsFilters,
  setSelectedTest,
  setTests,
  setTestsFilters,
} from '@redux/reducers/testsSlice';

import {Text} from '@custom-antd';

import {useGetTestExecutionMetricsQuery, useGetTestsQuery} from '@services/tests';

import Colors from '@styles/Colors';

import {EmptyTestsListContent} from './EmptyEntitiesListContent';

const TestsPageDescription: React.FC = () => {
  return (
    <Text className="regular middle" color={Colors.slate400}>
      Explore your tests at a glance... Learn more about{' '}
      <a href="https://kubeshop.github.io/testkube/" target="_blank">
        testing with Testkube
      </a>
    </Text>
  );
};

export const TestsEntity: EntityListBlueprint = {
  entity: 'tests',
  route: '/dashboard/tests',
  reduxSliceName: 'tests',
  pageTitle: 'Tests',
  addEntityButtonText: 'Add a new test',
  pageDescription: TestsPageDescription,
  emptyDataComponent: EmptyTestsListContent,

  useGetData: useGetTestsQuery,
  useGetMetrics: useGetTestExecutionMetricsQuery,
  setData: setTests,
  selectData: selectTests,

  setQueryFilters: setTestsFilters,
  selectQueryFilters: selectTestsFilters,
  selectAllFilters: selectAllTestsFilters,
  initialFiltersState: initialTestsFiltersState,
  setSelectedRecord: setSelectedTest,

  filtersComponentsIds: ['textSearch', 'selector', 'status'],
};

export default TestsEntity;
