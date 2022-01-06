import {DashboardBlueprint} from '@models/dashboard';

import {selectAllTestsFilters, selectFilters, selectSelectedTest} from '@redux/reducers/testsSlice';

import {useGetTestsQuery} from '@services/tests';

export const TestsEntity: DashboardBlueprint = {
  entityType: 'tests',
  route: '/dashboard/tests',
  reduxEntity: 'tests',
  pageTitle: 'Tests',
  hasInfoPanel: false,
  reduxListName: 'testsList',
  canSelectRow: false,
  filtersComponent: null,
  infoPanelComponent: null,

  useGetData: useGetTestsQuery,
  setData: () => {},
  selectData: () => {},

  selectSelectedRecord: selectSelectedTest,

  selectQueryFilters: selectFilters,
  selectAllFilters: selectAllTestsFilters,

  columns: [],
};

export default TestsEntity;
