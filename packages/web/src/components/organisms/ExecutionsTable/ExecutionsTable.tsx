import React, {memo, useCallback, useMemo} from 'react';

import {Table, TablePaginationConfig} from 'antd';
import {TableRowSelection} from 'antd/lib/table/interface';

import {UseMutation} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import {MutationDefinition} from '@reduxjs/toolkit/query';

import {Skeleton} from '@custom-antd';

import {SystemAccess, useSystemAccess} from '@hooks/useSystemAccess';

import EmptyDataWithFilters from '@organisms/EntityView/EmptyDataWithFilters';

import {useEntityDetailsField, useEntityDetailsPick} from '@store/entityDetails';
import {useExecutionDetailsPick} from '@store/executionDetails';

import EmptyExecutionsListContent from './EmptyExecutionsListContent';
import ExecutionsFilters from './ExecutionsFilters';
import TableRow from './TableRow';

interface ExecutionsTableProps {
  onRun: () => void;
  useAbortExecution: UseMutation<MutationDefinition<any, any, any, any, any>>;
}

const getKey = (record: any) => record.id;

const ExecutionsTable: React.FC<ExecutionsTableProps> = ({onRun, useAbortExecution}) => {
  const [currentPage, setCurrentPage] = useEntityDetailsField('currentPage');
  const [executionsFilters, setExecutionsFilters] = useEntityDetailsField('executionsFilters');
  const {daysFilterValue, executions, executionsLoading, id, isFirstTimeLoading} = useEntityDetailsPick(
    'executions',
    'id',
    'isFirstTimeLoading',
    'executionsLoading',
    'daysFilterValue'
  );
  const {id: execId, open} = useExecutionDetailsPick('id', 'open');
  const isWritable = useSystemAccess(SystemAccess.agent);

  const rowSelection: TableRowSelection<any> = useMemo(
    () => ({
      selectedRowKeys: execId ? [execId] : [],
      columnWidth: 0,
      renderCell: () => null,
    }),
    [execId]
  );

  const pagination: TablePaginationConfig = useMemo(
    () => ({
      pageSize: 10,
      current: currentPage,
      onChange: setCurrentPage,
      showSizeChanger: false,
    }),
    [currentPage, setCurrentPage]
  );

  const isFiltering = useMemo(
    () => Boolean(executionsFilters.textSearch.trim().length || executionsFilters.status.length),
    [executionsFilters]
  );
  const isEmptyExecutions = useMemo(() => !isFiltering && !executions?.results.length, [executions, isFiltering]);

  const [abortExecution] = useAbortExecution();
  const onAbortExecution = useCallback(
    (executionId: string) => {
      if (id) {
        abortExecution({executionId, id});
      }
    },
    [id, abortExecution]
  );

  const columns = useMemo(
    () => [
      {render: (data: any) => <TableRow data={data} onAbortExecution={isWritable ? onAbortExecution : undefined} />},
    ],
    [onAbortExecution, isWritable]
  );

  const onRow = useMemo(
    () => (record: any) => ({
      onClick: () => open(record.id),
    }),
    [open]
  );

  if (isFirstTimeLoading) {
    return <LoadingSkeleton />;
  }

  if (isEmptyExecutions && !isFiltering) {
    return <EmptyExecutionsListContent onRun={onRun} />;
  }

  return (
    <>
      <ExecutionsFilters />

      {(isFiltering && executionsLoading) || !daysFilterValue ? (
        <LoadingSkeleton />
      ) : isFiltering && !executionsLoading && !executions?.results.length ? (
        <EmptyDataWithFilters resetFilters={() => setExecutionsFilters({textSearch: '', status: []})} />
      ) : (
        <Table
          className="custom-table"
          showHeader={false}
          dataSource={executions?.results}
          columns={columns}
          onRow={onRow}
          rowSelection={rowSelection}
          rowKey={getKey}
          pagination={pagination}
        />
      )}
    </>
  );
};

const LoadingSkeleton = () => {
  return (
    <>
      <Skeleton additionalStyles={{lineHeight: 40}} />
      <Skeleton additionalStyles={{lineHeight: 40}} />
      <Skeleton additionalStyles={{lineHeight: 40}} />
    </>
  );
};

export default memo(ExecutionsTable);
