import React, {useCallback} from 'react';

import {Table} from 'antd';
import {TableRowSelection} from 'antd/lib/table/interface';

import {useEntityDetailsConfig} from '@constants/entityDetailsConfig/useEntityDetailsConfig';

import {Skeleton} from '@custom-antd';

import {useEntityDetailsField, useEntityDetailsPick} from '@store/entityDetails';
import {useExecutionDetailsPick} from '@store/executionDetails';

import EmptyExecutionsListContent from './EmptyExecutionsListContent';
import TableRow from './TableRow';

type ExecutionsTableProps = {
  onRun: () => void;
};

const ExecutionsTable: React.FC<ExecutionsTableProps> = props => {
  const {onRun} = props;

  const [currentPage, setCurrentPage] = useEntityDetailsField('currentPage');
  const {entity, executions, id, isFirstTimeLoading} = useEntityDetailsPick(
    'entity',
    'executions',
    'id',
    'isFirstTimeLoading'
  );
  const {id: execId, open} = useExecutionDetailsPick('id', 'open');

  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys: execId ? [execId] : [],
    columnWidth: 0,
    renderCell: () => null,
  };

  const isEmptyExecutions = !executions?.results || !executions?.results.length;

  const {useAbortExecution} = useEntityDetailsConfig(entity);
  const [abortExecution] = useAbortExecution();
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
    return <EmptyExecutionsListContent onRun={onRun} />;
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
          open(record.id);
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
