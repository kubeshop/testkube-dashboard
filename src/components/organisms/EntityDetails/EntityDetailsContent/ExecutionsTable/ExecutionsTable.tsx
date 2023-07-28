import React, {useCallback} from 'react';

import {Table} from 'antd';
import {TableRowSelection} from 'antd/lib/table/interface';

import {Skeleton} from '@custom-antd';

import {useEntityDetailsField, useEntityDetailsPick} from '@store/entityDetails';

import EmptyExecutionsListContent from './EmptyExecutionsListContent';
import TableRow from './TableRow';

type ExecutionsTableProps = {
  triggerRun: () => void;
};

const ExecutionsTable: React.FC<ExecutionsTableProps> = props => {
  const {triggerRun} = props;

  const [currentPage, setCurrentPage] = useEntityDetailsField('currentPage');
  const {executions, openExecutionDetails, id, execId, abortExecution, isFirstTimeLoading} = useEntityDetailsPick(
    'executions',
    'openExecutionDetails',
    'id',
    'execId',
    'abortExecution',
    'isFirstTimeLoading'
  );

  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys: execId ? [execId] : [],
    columnWidth: 0,
    renderCell: () => null,
  };

  const isEmptyExecutions = !executions?.results || !executions?.results.length;

  const onAbortExecution = useCallback(
    (executionId: string) => {
      if (id) {
        abortExecution({executionId, id});
      }
    },
    [id, abortExecution]
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
    return <EmptyExecutionsListContent triggerRun={triggerRun} />;
  }

  return (
    <Table
      className="custom-table"
      showHeader={false}
      dataSource={executions?.results}
      columns={[
        {
          render: data => {
            return <TableRow data={data} onAbortExecution={onAbortExecution} />;
          },
        },
      ]}
      onRow={(record: any) => ({
        onClick: () => {
          openExecutionDetails(record.id);
        },
      })}
      rowSelection={{...rowSelection}}
      rowKey={record => {
        return record.id;
      }}
      pagination={{
        pageSize: 10,
        current: currentPage,
        onChange: current => {
          setCurrentPage(current);
        },
        showSizeChanger: false,
      }}
    />
  );
};

export default ExecutionsTable;
