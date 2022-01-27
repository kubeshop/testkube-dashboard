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

import ExecutionsInfoPanel from '@organisms/DashboardInfoPanel/InfoPanels/ExecutionsInfoPanel';

import {getDuration, timeStampToDate} from '@utils/formatDate';

import {useGetExecutionsQuery} from '@services/executions';

export const ExecutionsEntity: DashboardBlueprint = {
  entityType: 'executions',
  route: '/dashboard/executions',
  reduxEntity: 'executions',
  pageTitle: 'Scripts executions',
  hasInfoPanel: true,
  reduxListName: 'executionsList',
  canSelectRow: true,

  infoPanelComponent: ExecutionsInfoPanel,

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

  columns: [
    {
      title: 'Type',
      dataIndex: 'scriptType',
      render: (scriptType: string) => {
        return {
          children: <TestTypeIcon testType={scriptType} width={30} height={30} />,
        };
      },
    },
    {
      title: 'Execution name',
      dataIndex: 'name',
      render: (name: string) => {
        return {
          children: name,
        };
      },
    },
    {
      title: 'Execution tags',
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
      title: 'Script name',
      dataIndex: 'scriptName',
      width: '25%',
      render: (scriptName: string) => {
        return {
          children: scriptName,
        };
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
      render: (testStatus: string) => {
        return {
          children: <RenderTestStatusSvgIcon testStatus={getStatus(testStatus)} />,
        };
      },
    },
  ],
  filtersComponentsIds: ['textSearch', 'scriptType', 'dateRange', 'status', 'tags'],
};

export default ExecutionsEntity;
