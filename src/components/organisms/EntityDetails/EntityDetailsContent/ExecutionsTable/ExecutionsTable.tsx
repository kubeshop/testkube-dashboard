import React, {useContext} from 'react';

import {Skeleton, Table} from 'antd';
import {TableRowSelection} from 'antd/lib/table/interface';

import {EntityDetailsContext} from '@contexts';

// import EntityDetailsSkeleton from '../EntityDetailsSkeleton';
import EmptyExecutionsListContent from './EmptyExecutionsListContent';
import TableRow from './TableRow';

type ExecutionsTableProps = {
  triggerRun: () => void;
};

const ExecutionsTable: React.FC<ExecutionsTableProps> = props => {
  const {triggerRun} = props;

  const {executionsList, selectedRow, currentPage, setCurrentPage, onRowSelect, isFirstTimeLoading} =
    useContext(EntityDetailsContext);

  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys: selectedRow ? [selectedRow.id] : [],
    columnWidth: 0,
    renderCell: () => null,
  };

  const isEmptyExecutions = !executionsList?.results || !executionsList?.results.length;

  if (isFirstTimeLoading) {
    return <Skeleton title={false} loading />;
  }

  if (isEmptyExecutions) {
    return <EmptyExecutionsListContent triggerRun={triggerRun} />;
  }

  return (
    <Table
      showHeader={false}
      dataSource={executionsList?.results}
      columns={[
        {
          render: data => {
            return <TableRow data={data} />;
          },
        },
      ]}
      onRow={(record: any) => ({
        onClick: () => {
          onRowSelect(record, true);
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
