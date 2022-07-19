import {EntityListBlueprint} from '@models/entity';

import {
  selectAllTestSuitesFilters,
  selectTestSuites,
  selectTestSuitesFilters,
  setTestSuites,
  setTestSuitesFilters,
} from '@redux/reducers/testSuitesSlice';

import {EmptyTestSuitesListContent} from '@molecules';

import {useGetTestSuitesQuery} from '@services/testSuites';

export const TestSuitesEntity: EntityListBlueprint = {
  entity: 'test-suites',
  route: '/dashboard/test-suites',
  reduxSliceName: 'testSuites',
  pageTitle: 'Test Suites',
  pageDescription: 'Some Desc TEst',
  emptyDataComponent: EmptyTestSuitesListContent,

  useGetData: useGetTestSuitesQuery,
  setData: setTestSuites,
  selectData: selectTestSuites,

  setQueryFilters: setTestSuitesFilters,
  selectQueryFilters: selectTestSuitesFilters,
  selectAllFilters: selectAllTestSuitesFilters,

  filtersComponentsIds: ['textSearch', 'selector', 'status'],
};

export default TestSuitesEntity;
