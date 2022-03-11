import {DashboardBlueprint} from '@models/dashboard';

import {
  selectAllTestSuiteExecutionsFilters,
  selectSelectedTestSuiteExecution,
  selectTestSuiteExecutions,
  selectTestSuiteExecutionsFilters,
  setSelectedTestSuiteExecution,
  setTestSuiteExecutions,
  setTestSuiteExecutionsFilters,
} from '@redux/reducers/testSuiteExecutionsSlice';
import {getStatus} from '@redux/utils/requestFilters';

import {RenderTestStatusSvgIcon} from '@atoms';

import TestSuiteExecutionsInfoPanel from '@organisms/DashboardInfoPanel/InfoPanels/TestSuiteExecutionsInfoPanel/TestSuiteExecutionsInfoPanel';

import {getDuration, timeStampToDate} from '@utils/formatDate';

import {useGetTestSuiteExecutionsByTestIdQuery} from '@services/testSuiteExecutions';

export const TestSuiteExecutionsEntity: DashboardBlueprint = {
  entityType: 'test-suite-executions',
  route: '/dashboard/test-suite-executions',
  reduxEntity: 'testSuiteExecutions',
  pageTitle: 'Test Suite Executions',
  hasInfoPanel: true,
  reduxListName: 'dataList',
  canSelectRow: true,

  infoPanelComponent: TestSuiteExecutionsInfoPanel,

  useGetData: useGetTestSuiteExecutionsByTestIdQuery,
  setData: setTestSuiteExecutions,
  selectData: selectTestSuiteExecutions,

  setQueryFilters: setTestSuiteExecutionsFilters,
  selectQueryFilters: selectTestSuiteExecutionsFilters,
  selectAllFilters: selectAllTestSuiteExecutionsFilters,

  setSelectedRecord: setSelectedTestSuiteExecution,
  selectSelectedRecord: selectSelectedTestSuiteExecution,

  selectedRecordIdFieldName: 'id',
  testTypeFieldName: 'testType',

  columns: [
    {
      title: 'Test suite execution name',
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
  filtersComponentsIds: ['textSearch', 'selector'],
};

export default TestSuiteExecutionsEntity;
