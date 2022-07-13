import {EntityListBlueprint} from '@models/entity';

import {
  selectAllTestSuitesFilters,
  selectTestSuitesFilters,
  setTestSuitesFilters,
} from '@redux/reducers/testSuitesSlice';
import {selectTests, setTests} from '@redux/reducers/testsSlice';

import {EmptyTestsListContent} from '@molecules';

import {useGetTestsQuery} from '@services/tests';

export const TestsEntity: EntityListBlueprint = {
  entity: 'tests',
  route: '/dashboard/tests',
  reduxSliceName: 'tests',
  pageTitle: 'Tests',
  pageDescription: 'das',
  emptyDataComponent: EmptyTestsListContent,

  useGetData: useGetTestsQuery,
  setData: setTests,
  selectData: selectTests,

  setQueryFilters: setTestSuitesFilters,
  selectQueryFilters: selectTestSuitesFilters,
  selectAllFilters: selectAllTestSuitesFilters,

  filtersComponentsIds: ['textSearch', 'selector', 'status'],
};

export default TestsEntity;
