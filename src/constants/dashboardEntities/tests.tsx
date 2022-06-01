import {DashboardBlueprint} from '@models/dashboard';

import {
  selectAllTestsFilters,
  selectSelectedTest,
  selectTests,
  selectTestsFilters,
  setSelectedTest,
  setTests,
  setTestsFilters,
} from '@redux/reducers/testsSlice';

import {useGetTestsQuery} from '@services/tests';

import {testsDashboardGradient} from '@styles/gradients';

export const TestsEntity: DashboardBlueprint = {
  entityType: 'tests',
  route: '/dashboard/tests',
  dashboardGradient: testsDashboardGradient,
  reduxEntity: 'tests',
  pageTitle: 'Tests',
  hasInfoPanel: true,
  reduxListName: 'test',
  canSelectRow: true,
  emptyDrawerEntity: 'test',

  useGetData: useGetTestsQuery,
  setData: setTests,
  selectData: selectTests,

  setQueryFilters: setTestsFilters,
  selectQueryFilters: selectTestsFilters,
  selectAllFilters: selectAllTestsFilters,

  setSelectedRecord: setSelectedTest,
  selectSelectedRecord: selectSelectedTest,

  selectedRecordIdFieldName: 'name',
  testTypeFieldName: 'type',

  filtersComponentsIds: ['textSearch', 'selector', 'status'],
};

export default TestsEntity;
