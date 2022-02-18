import {DashboardBlueprint} from '@models/dashboard';

import TestsInfoPanel from '@organisms/DashboardInfoPanel/InfoPanels/TestsInfoPanel';

import {timeStampToDate} from '@utils/formatDate';

import {
  selectAllTestsFilters,
  selectSelectedTest,
  selectTests,
  selectTestsFilters,
  setSelectedTest,
  setTests,
  setTestsFilters,
} from '@src/redux/reducers/testsSlice';
import {useGetTestsQuery} from '@src/services/tests';

export const TestsEntity: DashboardBlueprint = {
  entityType: 'tests',
  route: '/dashboard/tests',
  reduxEntity: 'tests',
  pageTitle: 'Tests',
  hasInfoPanel: true,
  reduxListName: 'dataList',
  canSelectRow: true,

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
      title: 'Test tags',
      render: (data: any) => {
        if (!data.tags) {
          return <span> - </span>;
        }

        return (
          <div>
            <span>{data.tags.join(', ')}</span>
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
  filtersComponentsIds: ['textSearch', 'testType', 'date', 'tags'],
};

export default TestsEntity;
