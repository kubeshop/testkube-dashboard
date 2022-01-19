import {DashboardBlueprint} from '@models/dashboard';

import {
  selectAllTestsFilters,
  selectFilters,
  selectSelectedTestExecution,
  selectTestExecutions,
  setFilters,
  setSelectedTestExecution,
  setTestExecutions,
} from '@redux/reducers/testExecutionsSlice';
import {getStatus} from '@redux/utils/requestFilters';

import {RenderTestStatusSvgIcon} from '@atoms';

import TestExecutionsInfoPanel from '@organisms/DashboardInfoPanel/InfoPanels/TestExecutionsInfoPanel/TestExecutionsInfoPanel';

import {getDuration, timeStampToDate} from '@utils/formatDate';

import {useGetTestExecutionsByTestIdQuery} from '@services/testExecutions';

export const TestExecutionsEntity: DashboardBlueprint = {
  entityType: 'test-executions',
  route: '/dashboard/test-executions',
  reduxEntity: 'testExecutions',
  pageTitle: 'Tests executions',
  hasInfoPanel: true,
  reduxListName: 'executionsList',
  canSelectRow: true,

  infoPanelComponent: TestExecutionsInfoPanel,

  useGetData: useGetTestExecutionsByTestIdQuery,
  setData: setTestExecutions,
  selectData: selectTestExecutions,

  setQueryFilters: setFilters,
  selectQueryFilters: selectFilters,
  selectAllFilters: selectAllTestsFilters,

  setSelectedRecord: setSelectedTestExecution,
  selectSelectedRecord: selectSelectedTestExecution,

  selectedRecordIdFieldName: 'id',
  scriptTypeFieldName: 'scriptType',

  columns: [
    {
      title: 'Test execution name',
      dataIndex: 'name',
    },
    {
      title: 'Test name',
      dataIndex: 'testName',
    },
    {
      title: 'Number of steps executed',
      dataIndex: 'execution',
      render: (execution: any) => {
        return {children: execution && execution.length};
      },
    },

    {
      title: 'Started At',
      dataIndex: 'startTime',
      render: (startTime: string) => {
        return {
          children: startTime ? timeStampToDate(startTime) : '-',
        };
      },
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      render: (duration: string, row: any) => {
        return {
          children: row.endTime ? getDuration(row.startTime, row.endTime) : '-',
        };
      },
      key: 'duration',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '5%',
      render: (testStatus: string) => {
        return {
          children: <RenderTestStatusSvgIcon testStatus={getStatus(testStatus)} />,
        };
      },
    },
  ],
  filtersComponentsIds: ['textSearch', 'tags'],
};

export default TestExecutionsEntity;
