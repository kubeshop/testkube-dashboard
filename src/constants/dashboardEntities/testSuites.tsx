import {DashboardBlueprint} from '@models/dashboard';

import {
  selectAllTestSuitesFilters,
  selectSelectedTestSuite,
  selectTestSuites,
  selectTestSuitesFilters,
  setSelectedTestSuite,
  setTestSuites,
  setTestSuitesFilters,
} from '@redux/reducers/testSuitesSlice';

import {useGetTestSuitesQuery} from '@services/testSuites';

export const TestSuitesEntity: DashboardBlueprint = {
  entityType: 'test-suites',
  route: '/dashboard/test-suites',
  reduxEntity: 'testSuites',
  pageTitle: 'Test Suites',
  hasInfoPanel: true,
  reduxListName: 'testSuite',
  canSelectRow: true,
  emptyDrawerEntity: 'test suite',

  useGetData: useGetTestSuitesQuery,
  setData: setTestSuites,
  selectData: selectTestSuites,

  setQueryFilters: setTestSuitesFilters,
  selectQueryFilters: selectTestSuitesFilters,
  selectAllFilters: selectAllTestSuitesFilters,

  setSelectedRecord: setSelectedTestSuite,
  selectSelectedRecord: selectSelectedTestSuite,

  selectedRecordIdFieldName: 'name',

  filtersComponentsIds: ['textSearch', 'selector', 'status'],
};

export default TestSuitesEntity;
