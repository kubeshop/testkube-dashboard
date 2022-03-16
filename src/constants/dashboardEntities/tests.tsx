import {DashboardBlueprint} from '@models/dashboard';
import {LabelKey} from '@models/labels';

import {
  selectAllTestsFilters,
  selectSelectedTest,
  selectTests,
  selectTestsFilters,
  setSelectedTest,
  setTests,
  setTestsFilters,
} from '@redux/reducers/testsSlice';

import TestsInfoPanel from '@organisms/DashboardInfoPanel/InfoPanels/TestsInfoPanel';

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
  reduxListName: 'dataList',
  canSelectRow: true,
  emptyDrawerEntity: 'test',

  infoPanelComponent: TestsInfoPanel,

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

        const labelKeys: LabelKey[] = Object.keys(data.labels);

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
  filtersComponentsIds: ['textSearch'],
};

export default TestsEntity;
