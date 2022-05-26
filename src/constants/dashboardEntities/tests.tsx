import {DashboardBlueprint} from '@models/dashboard';
import {EntityKey} from '@models/entityMap';

import {
  selectAllTestsFilters,
  selectSelectedTest,
  selectTests,
  selectTestsFilters,
  setSelectedTest,
  setTests,
  setTestsFilters,
} from '@redux/reducers/testsSlice';

import {timeStampToDate} from '@utils/formatDate';

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

  columns: [
    {
      title: 'Test name',
      dataIndex: 'name',
    },
    {title: 'Test type', dataIndex: 'type', key: 'type'},
    {
      title: 'Test labels',
      render: (data: any) => {
        if (!data.labels) {
          return <span> - </span>;
        }

        const labelKeys: EntityKey[] = Object.keys(data.labels);

        return (
          <div>
            <span>{labelKeys.join(', ')}</span>
          </div>
        );
      },
    },
    {
      title: 'Created at',
      dataIndex: 'created',
      render: (created: string) => timeStampToDate(created),
    },
    {},
  ],
  filtersComponentsIds: ['textSearch', 'selector', 'status'],
};

export default TestsEntity;
