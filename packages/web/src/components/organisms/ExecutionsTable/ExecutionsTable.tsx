import React, {memo, useCallback, useMemo, useState} from 'react';

import {Input, Table, TablePaginationConfig} from 'antd';
import {TableRowSelection} from 'antd/lib/table/interface';

import {UseMutation} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import {MutationDefinition} from '@reduxjs/toolkit/query';

import EmptyDataWithFilters from '@atoms/EmptyDataWithFilters';

import {Skeleton} from '@custom-antd';

import {SystemAccess, useSystemAccess} from '@hooks/useSystemAccess';

import {ExecutionStatusEnum} from '@models/execution';

import {useGetTestExecutionsByIdQuery} from '@services/tests';

import {useEntityDetailsField, useEntityDetailsPick} from '@store/entityDetails';
import {useExecutionDetailsPick} from '@store/executionDetails';

import EmptyExecutionsListContent from './EmptyExecutionsListContent';
import TableRow from './TableRow';

interface ExecutionsTableProps {
  onRun: () => void;
  useAbortExecution: UseMutation<MutationDefinition<any, any, any, any, any>>;
}

const getKey = (record: any) => record.id;

type Filters = {
  textSearch?: string;
  status?: ExecutionStatusEnum;
};

const ExecutionsTable: React.FC<ExecutionsTableProps> = ({onRun, useAbortExecution}) => {
  const [filters, setFilters] = useState<Filters | undefined>({});

  const [currentPage, setCurrentPage] = useEntityDetailsField('currentPage');
  const {
    executions: entityExecutions,
    id,
    isFirstTimeLoading,
  } = useEntityDetailsPick('executions', 'id', 'isFirstTimeLoading');
  const {id: execId, open} = useExecutionDetailsPick('id', 'open');
  const isWritable = useSystemAccess(SystemAccess.agent);

  const isFiltering = useMemo(
    () => Boolean(filters && (filters.textSearch?.trim().length || filters.status)),
    [filters]
  );

  const {data: filteredExecutions, isLoading: isFilteringLoading} = useGetTestExecutionsByIdQuery(
    {
      id: id!,
      ...filters,
    },
    {
      skip: !id || !isFiltering,
    }
  );

  const executions = useMemo(
    () => (isFiltering ? filteredExecutions : entityExecutions),
    [isFiltering, filteredExecutions, entityExecutions]
  );

  const isEmptyExecutions = useMemo(() => !isFiltering && !executions?.results.length, [executions, isFiltering]);

  const isTableVisible = useMemo(() => {
    if (isEmptyExecutions) return false;
    if (isFiltering && isFilteringLoading) return false;
    if (isFiltering && !isFilteringLoading && !filteredExecutions?.results.length) return false;
    return true;
  }, [isEmptyExecutions, isFiltering, isFiltering, filteredExecutions]);

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
    [currentPage]
  );

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
      <Input value={filters?.textSearch} onChange={e => setFilters({...filters, textSearch: e.target.value})} />

      {isFiltering && isFilteringLoading && <LoadingSkeleton />}

      {isFiltering && !isFilteringLoading && !filteredExecutions?.results.length && (
        <EmptyDataWithFilters resetFilters={() => setFilters(undefined)} />
      )}

      {isTableVisible && (
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
