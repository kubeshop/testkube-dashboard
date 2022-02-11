import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';

import {Spin, Table} from 'antd';
import {TableRowSelection} from 'antd/lib/table/interface';

import {useAppSelector} from '@redux/hooks';
import {selectApiEndpoint} from '@redux/reducers/configSlice';

import {Title} from '@atoms';

import {useGetExecutionsQuery} from '@services/executions';
import {useGetScriptsQuery} from '@services/scripts';
import {useGetTestExecutionsByTestIdQuery} from '@services/testExecutions';
import {useGetTestsQuery} from '@services/tests';

import {StyledDashboardContentContainer} from './DashboardContent.styled';
import DashboardFilters from './DashboardFilters';

const pollingInterval = 5000;

// The reason I've done like this is here https://github.com/reduxjs/redux-toolkit/issues/1970.
// Let's discuss if you have anything to add, maybe an idea how to rework it.
const TestsDataLayer = ({onDataChange, queryFilters}: any) => {
  const {data, isLoading, isFetching, refetch} = useGetTestsQuery(queryFilters || null, {
    pollingInterval,
  });

  useEffect(() => {
    onDataChange({data, isLoading, isFetching, refetch});
  }, [data, isLoading, isFetching]);

  return <></>;
};

const TestsExecutionsDataLayer = ({onDataChange, queryFilters}: any) => {
  const {data, isLoading, isFetching, refetch} = useGetTestExecutionsByTestIdQuery(queryFilters || null, {
    pollingInterval,
  });

  useEffect(() => {
    onDataChange({data, isLoading, isFetching, refetch});
  }, [data, isLoading, isFetching]);

  return <></>;
};

const ScriptsDataLayer = ({onDataChange, queryFilters}: any) => {
  const {data, isLoading, isFetching, refetch} = useGetScriptsQuery(queryFilters || null, {
    pollingInterval,
  });

  useEffect(() => {
    onDataChange({data, isLoading, isFetching, refetch});
  }, [data, isLoading, isFetching]);

  return <></>;
};

const ScriptsExecutionsDataLayer = ({onDataChange, queryFilters}: any) => {
  const {data, isLoading, isFetching, refetch} = useGetExecutionsQuery(queryFilters || null, {
    pollingInterval,
  });

  useEffect(() => {
    onDataChange({data, isLoading, isFetching, refetch});
  }, [data, isLoading, isFetching]);

  return <></>;
};

const DashboardContent: React.FC<any> = props => {
  const {
    pageTitle,
    dataSource,
    columns,
    // isLoading,
    // isFetching,
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
    setData,
  } = props;
  const dispatch = useDispatch();

  const apiEndpoint = useAppSelector(selectApiEndpoint);

  const [contentProps, setContentProps] = useState<any>({
    data: null,
    isLoading: false,
    isFetching: false,
    refetch: () => {},
  });

  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys: selectedRecord ? [`${entityType}-${selectedRecord[selectedRecordIdFieldName]}`] : [],
    columnWidth: 0,
    renderCell: () => null,
  };

  const onDataChange = (data: any) => {
    setContentProps(data);
  };

  const dataLayers: any = {
    Tests: <TestsDataLayer onDataChange={onDataChange} queryFilters={queryFilters} />,
    'Tests executions': <TestsExecutionsDataLayer onDataChange={onDataChange} queryFilters={queryFilters} />,
    Scripts: <ScriptsDataLayer onDataChange={onDataChange} queryFilters={queryFilters} />,
    'Scripts executions': <ScriptsExecutionsDataLayer onDataChange={onDataChange} queryFilters={queryFilters} />,
  };

  useEffect(() => {
    if (!setData) {
      return;
    }

    if (contentProps.data === null || contentProps.data?.results === []) {
      dispatch(setData([]));

      if (canSelectRow) {
        dispatch(setSelectedRecord({selectedRecord: null}));
      }

      return;
    }

    if (contentProps.data) {
      dispatch(setData(contentProps.data));

      if (canSelectRow) {
        dispatch(setSelectedRecord(contentProps.data));
      }
    }
  }, [contentProps.data]);

  useEffect(() => {
    contentProps?.refetch();
  }, [apiEndpoint]);

  return (
    <StyledDashboardContentContainer
      shouldInfoPanelBeShown={shouldInfoPanelBeShown}
      isInfoPanelExpanded={isInfoPanelExpanded}
    >
      {dataLayers[pageTitle]}
      <Title>
        {pageTitle} {contentProps.isFetching && <Spin />}
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
        loading={contentProps.isLoading}
        rowSelection={canSelectRow && rowSelection}
        rowClassName="table-row-dark"
        rowKey={record => {
          return `${entityType}-${record[selectedRecordIdFieldName]}`;
        }}
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
