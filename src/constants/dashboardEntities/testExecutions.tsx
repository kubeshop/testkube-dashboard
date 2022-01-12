/* eslint-disable unused-imports/no-unused-imports-ts */
import {DashboardBlueprint} from '@models/dashboard';

import {
  selectAllExecutionsFilters,
  selectExecutions,
  selectFilters,
  selectSelectedExecution,
  setExecutions,
  setFilters,
  setSelectedExecution,
} from '@redux/reducers/executionsSlice';
import {getStatus} from '@redux/utils/requestFilters';

import {RenderTestStatusSvgIcon, TestTypeIcon} from '@atoms';

import {ExecutionsFilters} from '@molecules/Filters';

import ExecutionsInfoPanel from '@organisms/DashboardInfoPanel/InfoPanels/ExecutionsInfoPanel';

import {getDuration, timeStampToDate} from '@utils/formatDate';

import {useGetExecutionsQuery} from '@services/executions';

export const TestExecutionsEntity: DashboardBlueprint = {
  entityType: 'testExecutions',
  route: '/dashboard/test-executions',
  reduxEntity: 'testExecutions',
  pageTitle: 'Test executions',
  hasInfoPanel: false,
  reduxListName: 'executionsList',
  canSelectRow: false,

  filtersComponent: null,
  infoPanelComponent: null,

  useGetData: useGetExecutionsQuery,
  setData: setExecutions,
  selectData: selectExecutions,

  setQueryFilters: setFilters,
  selectQueryFilters: selectFilters,
  selectAllFilters: selectAllExecutionsFilters,

  setSelectedRecord: setSelectedExecution,
  selectSelectedRecord: selectSelectedExecution,

  selectedRecordIdFieldName: 'id',
  scriptTypeFieldName: 'scriptType',

  // columns: [
  //   {
  //     title: 'Type',
  //     dataIndex: 'scriptType',
  //     width: '10%',
  //     render: (testType: string) => {
  //       return {
  //         children: <TestTypeIcon testType={testType} width={30} height={30} />,
  //         props: {
  //           role: 'cell',
  //         },
  //       };
  //     },
  //   },
  //   {
  //     title: 'Name',
  //     dataIndex: 'name',
  //     width: '25%',
  //     render: (name: string) => {
  //       return {
  //         children: name,
  //         props: {
  //           role: 'cell',
  //         },
  //       };
  //     },
  //   },
  //   {
  //     title: 'Script',
  //     dataIndex: 'scriptName',
  //     width: '25%',
  //     render: (scriptName: string) => {
  //       return {
  //         children: scriptName,
  //         props: {
  //           role: 'cell',
  //         },
  //       };
  //     },
  //   },
  //   {
  //     title: 'Started At',
  //     dataIndex: 'startTime',
  //     render: (startTime: string) => {
  //       return {
  //         children: startTime ? timeStampToDate(startTime) : '-',
  //         props: {
  //           role: 'cell',
  //         },
  //       };
  //     },
  //     width: '15%',
  //   },
  //   {
  //     title: 'Duration',
  //     dataIndex: 'duration',
  //     render: (duration: string, row: any) => {
  //       return {
  //         children: row.endTime ? getDuration(row.startTime, row.endTime) : '-',
  //         props: {
  //           role: 'cell',
  //         },
  //       };
  //     },
  //     key: 'duration',
  //     width: '15%',
  //   },
  //   {
  //     title: 'Status',
  //     dataIndex: 'status',
  //     width: '5%',
  //     render: (testStatus: string) => {
  //       return {
  //         children: <RenderTestStatusSvgIcon testStatus={getStatus(testStatus)} />,
  //         props: {
  //           role: 'cell',
  //         },
  //       };
  //     },
  //   },
  // ],
};

export default TestExecutionsEntity;
