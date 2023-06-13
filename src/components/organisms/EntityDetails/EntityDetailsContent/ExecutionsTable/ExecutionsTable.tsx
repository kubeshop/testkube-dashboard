import React, {useCallback} from 'react';

import {Table} from 'antd';
import {TableRowSelection} from 'antd/lib/table/interface';

import {Skeleton} from '@custom-antd';

import {useEntityDetailsStore} from '@store/entityDetails';

import EmptyExecutionsListContent from './EmptyExecutionsListContent';
import TableRow from './TableRow';

type ExecutionsTableProps = {
  triggerRun: () => void;
};

const ExecutionsTable: React.FC<ExecutionsTableProps> = props => {
  const {triggerRun} = props;

  const {
    executionsList,
    selectedRow,
    currentPage,
    setCurrentPage,
    onRowSelect,
    id,
    abortExecution,
    isFirstTimeLoading,
  } = useEntityDetailsStore(x => ({
    executionsList: x.executionsList,
    selectedRow: x.selectedRow,
    currentPage: x.currentPage,
    setCurrentPage: x.setCurrentPage,
    onRowSelect: x.onRowSelect,
    id: x.id,
    abortExecution: x.abortExecution,
    isFirstTimeLoading: x.isFirstTimeLoading,
  }));

  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys: selectedRow ? [selectedRow] : [],
    columnWidth: 0,
    renderCell: () => null,
  };

  const isEmptyExecutions = !executionsList?.results || !executionsList?.results.length;

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
      dataSource={executionsList?.results}
      columns={[
        {
          render: data => {
            return <TableRow data={data} onAbortExecution={onAbortExecution} />;
          },
        },
      ]}
      onRow={(record: any) => ({
        onClick: () => {
          onRowSelect(record);
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
