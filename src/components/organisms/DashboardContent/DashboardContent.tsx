import {Spin, Table} from 'antd';
import {TableRowSelection} from 'antd/lib/table/interface';

import {Title} from '@atoms';

import {StyledDashboardContentContainer} from './DashboardContent.styled';
import DashboardFilters from './DashboardFilters';

const DashboardContent: React.FC<any> = props => {
  const {
    pageTitle,
    dataSource,
    columns,
    isLoading,
    isFetching,
    canSelectRow,
    onRowSelect,
    selectedRecord,
    selectedRecordIdFieldName,
    shouldInfoPanelBeShown,
    isInfoPanelExpanded,
    setSelectedRecord,
    paginationOptions,
    setQueryFilters,
    queryFilters,
    filtersComponentsIds,
    entityType,
  } = props;

  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys: selectedRecord ? [selectedRecord[selectedRecordIdFieldName]] : [],
    columnWidth: 0,
    renderCell: () => null,
  };

  return (
    <StyledDashboardContentContainer
      shouldInfoPanelBeShown={shouldInfoPanelBeShown}
      isInfoPanelExpanded={isInfoPanelExpanded}
    >
      <Title>
        {pageTitle} {isFetching && <Spin />}
      </Title>
      {filtersComponentsIds && filtersComponentsIds.length ? (
        <DashboardFilters
          setSelectedRecord={setSelectedRecord}
          selectedRecord={selectedRecord}
          setFilters={setQueryFilters}
          filters={queryFilters}
          filtersComponentsIds={filtersComponentsIds}
          entityType={entityType}
        />
      ) : null}
      <Table
        dataSource={dataSource}
        columns={columns}
        loading={isLoading}
        rowSelection={canSelectRow && rowSelection}
        rowClassName="table-row-dark"
        rowKey={record => record[selectedRecordIdFieldName]}
        pagination={paginationOptions}
        onRow={record => ({
          onClick: () => {
            if (canSelectRow) {
              onRowSelect(record);
            }
          },
        })}
      />
    </StyledDashboardContentContainer>
  );
};

export default DashboardContent;
