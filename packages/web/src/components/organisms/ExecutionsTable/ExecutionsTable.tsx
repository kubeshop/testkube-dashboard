import React, {memo, useCallback, useMemo, useState} from 'react';

import {Input, Table, TablePaginationConfig} from 'antd';
import {TableRowSelection} from 'antd/lib/table/interface';

import {UseMutation} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import {MutationDefinition} from '@reduxjs/toolkit/query';

import debounce from 'lodash.debounce';

import {Skeleton} from '@custom-antd';

import {SystemAccess, useSystemAccess} from '@hooks/useSystemAccess';

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

const ExecutionsTable: React.FC<ExecutionsTableProps> = ({onRun, useAbortExecution}) => {
  const [textSearch, _setTextSearch] = useState<string>();
  const setTextSearch = useCallback(debounce(_setTextSearch, 300), [_setTextSearch]);

  const [currentPage, setCurrentPage] = useEntityDetailsField('currentPage');
  const {
    executions: entityExecutions,
    id,
    isFirstTimeLoading,
  } = useEntityDetailsPick('executions', 'id', 'isFirstTimeLoading');
  const {id: execId, open} = useExecutionDetailsPick('id', 'open');
  const isWritable = useSystemAccess(SystemAccess.agent);

  const {data: filteredExecutions} = useGetTestExecutionsByIdQuery(
    {
      id: id!,
      textSearch,
    },
    {
      skip: !id || !textSearch || !textSearch.trim().length,
    }
  );

  const executions = useMemo(() => filteredExecutions || entityExecutions, [filteredExecutions, entityExecutions]);

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

  const isEmptyExecutions = !executions?.results || !executions?.results.length;

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
    return (
      <>
        <Skeleton additionalStyles={{lineHeight: 40}} />
        <Skeleton additionalStyles={{lineHeight: 40}} />
        <Skeleton additionalStyles={{lineHeight: 40}} />
      </>
    );
  }

  if (isEmptyExecutions) {
    return <EmptyExecutionsListContent onRun={onRun} />;
  }

  return (
    <>
      <Input value={textSearch} onChange={e => setTextSearch(e.target.value)} />
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
    </>
  );
};

export default memo(ExecutionsTable);
