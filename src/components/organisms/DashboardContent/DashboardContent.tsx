/* eslint-disable unused-imports/no-unused-imports-ts */
import {useContext, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';

import {Spin, Table} from 'antd';
import {TableRowSelection} from 'antd/lib/table/interface';

import {useAppSelector} from '@redux/hooks';
import {selectApiEndpoint} from '@redux/reducers/configSlice';

import {Title} from '@atoms';

import {useGetExecutionsQuery} from '@services/executions';
import {useGetTestSuiteExecutionsByTestIdQuery} from '@services/testSuiteExecutions';
import {useGetTestSuitesQuery} from '@services/testSuites';
import {useGetTestsQuery} from '@services/tests';

import Fonts from '@styles/Fonts';

import {DashboardContext} from '../DashboardContainer/DashboardContainer';
import {
  StyledDashboardContent,
  StyledDashboardContentContainer,
  StyledDashboardContentTitleBottomGradient,
  StyledDashboardContentTitleGradient,
} from './DashboardContent.styled';
import DashboardFilters from './DashboardFilters';

const pollingInterval = 5000;

// The reason I've done this is here https://github.com/reduxjs/redux-toolkit/issues/1970.
// Let's discuss if you have anything to add, maybe an idea how to rework it.
const TestSuitesDataLayer = ({onDataChange, queryFilters}: any) => {
  const {data, isLoading, isFetching, refetch} = useGetTestSuitesQuery(queryFilters || null, {
    pollingInterval,
  });

  useEffect(() => {
    onDataChange({data, isLoading, isFetching, refetch});
  }, [data, isLoading, isFetching]);

  return <></>;
};

const TestSuiteExecutionsDataLayer = ({onDataChange, queryFilters}: any) => {
  const {data, isLoading, isFetching, refetch} = useGetTestSuiteExecutionsByTestIdQuery(queryFilters || null, {
    pollingInterval,
  });

  useEffect(() => {
    onDataChange({data, isLoading, isFetching, refetch});
  }, [data, isLoading, isFetching]);

  return <></>;
};

const TestsDataLayer = ({onDataChange, queryFilters}: any) => {
  const {data, isLoading, isFetching, refetch} = useGetTestsQuery(queryFilters || null, {
    pollingInterval,
  });

  useEffect(() => {
    onDataChange({data, isLoading, isFetching, refetch});
  }, [data, isLoading, isFetching]);

  return <></>;
};

const ExecutionsDataLayer = ({onDataChange, queryFilters}: any) => {
  const {data, isLoading, isFetching, refetch} = useGetExecutionsQuery(queryFilters || null, {
    pollingInterval,
  });

  useEffect(() => {
    onDataChange({data, isLoading, isFetching, refetch});
  }, [data, isLoading, isFetching]);

  return <></>;
};

const DashboardContent: React.FC<any> = props => {
  const {onRowSelect, paginationOptions} = props;

  const {
    selectedRecord,
    entityType,
    selectedRecordIdFieldName,
    queryFilters,
    setData,
    canSelectRow,
    setSelectedRecord,
    shouldInfoPanelBeShown,
    isInfoPanelExpanded,
    isSecondLevelOpen,
    filtersComponentsIds,
    setQueryFilters,
    pageTitle,
    dataSource,
    columns,
    dashboardGradient,
  } = useContext(DashboardContext);

  const dispatch = useDispatch();

  const apiEndpoint = useAppSelector(selectApiEndpoint);

  const [contentProps, setContentProps] = useState<any>({
    data: null,
    isLoading: false,
    isFetching: false,
    refetch: () => {},
  });

  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys:
      selectedRecord && selectedRecordIdFieldName ? [`${entityType}-${selectedRecord[selectedRecordIdFieldName]}`] : [],
    columnWidth: 0,
    renderCell: () => null,
  };

  const onDataChange = (data: any) => {
    setContentProps(data);
  };

  const dataLayers: any = {
    'Test Suites': <TestSuitesDataLayer onDataChange={onDataChange} queryFilters={queryFilters} />,
    'Test Suite Executions': <TestSuiteExecutionsDataLayer onDataChange={onDataChange} queryFilters={queryFilters} />,
    Tests: <TestsDataLayer onDataChange={onDataChange} queryFilters={queryFilters} />,
    Executions: <ExecutionsDataLayer onDataChange={onDataChange} queryFilters={queryFilters} />,
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
    }
  }, [contentProps.data]);

  useEffect(() => {
    contentProps?.refetch();
  }, [apiEndpoint]);

  return (
    <StyledDashboardContentContainer
      shouldInfoPanelBeShown={shouldInfoPanelBeShown}
      isInfoPanelExpanded={isInfoPanelExpanded}
      isSecondLevelOpen={isSecondLevelOpen}
      gradient={dashboardGradient}
    >
      {dataLayers[pageTitle]}
      <StyledDashboardContentTitleGradient gradient={dashboardGradient}>
        <StyledDashboardContentTitleBottomGradient />
      </StyledDashboardContentTitleGradient>
      <StyledDashboardContent>
        <Title font={Fonts.ptSans}>
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
          rowSelection={canSelectRow ? rowSelection : undefined}
          rowClassName="table-row-dark"
          rowKey={record => {
            return `${entityType}${
              selectedRecordIdFieldName && record[selectedRecordIdFieldName]
                ? `-${record[selectedRecordIdFieldName]}`
                : ''
            }`;
          }}
          pagination={paginationOptions}
          onRow={record => ({
            onClick: () => {
              if (canSelectRow) {
                onRowSelect(record);
              }
            },
          })}
          // showHeader={false}
        />
      </StyledDashboardContent>
    </StyledDashboardContentContainer>
  );
};

export default DashboardContent;
