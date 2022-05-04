/* eslint-disable unused-imports/no-unused-imports-ts */
import {useContext, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';

import {TableRowSelection} from 'antd/lib/table/interface';

import {useGA4React} from 'ga-4-react';
import moment from 'moment';

import {TestWithExecution} from '@models/test';
import {TestSuiteWithExecution} from '@models/testSuite';

import {useAppSelector} from '@redux/hooks';
import {clearTargetTestId, selectApiEndpoint, selectRedirectTarget} from '@redux/reducers/configSlice';

import {Skeleton} from '@custom-antd';

import {PollingIntervals} from '@utils/numbers';

import {useGetTestSuitesQuery} from '@services/testSuites';
import {useGetTestsQuery} from '@services/tests';

import {DashboardContext} from '../DashboardContainer/DashboardContainer';
import {
  StyledContentTable,
  StyledDashboardContent,
  StyledDashboardContentContainer,
  StyledDashboardContentTitleBottomGradient,
  StyledDashboardContentTitleGradient,
} from './DashboardContent.styled';
import DashboardFilters from './DashboardFilters';
import DashboardTableRow from './DashboardTableRow';
import DashboardTitle from './DashboardTitle';

interface OnDataChangeInterface {
  data: TestSuiteWithExecution[] | TestWithExecution[];
  isLoading: boolean;
  isFetching: boolean;
  refetch: Function;
}

type DataLayerProps = {
  onDataChange: (args: OnDataChangeInterface) => void;
  queryFilters: any;
};

const TestSuitesDataLayer: React.FC<DataLayerProps> = props => {
  const {onDataChange, queryFilters} = props;

  const {data, isLoading, isFetching, refetch} = useGetTestSuitesQuery(queryFilters || null, {
    pollingInterval: PollingIntervals.everySecond,
  });

  useEffect(() => {
    onDataChange({data: data || [], isLoading, isFetching, refetch});
  }, [data, isLoading, isFetching]);

  return <></>;
};

const TestsDataLayer: React.FC<DataLayerProps> = props => {
  const {onDataChange, queryFilters} = props;

  const {data, isLoading, isFetching, refetch} = useGetTestsQuery(queryFilters || null, {
    pollingInterval: PollingIntervals.everySecond,
  });

  useEffect(() => {
    onDataChange({data: data || [], isLoading, isFetching, refetch});
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
    dashboardGradient,
    closeSecondLevel,
  } = useContext(DashboardContext);

  const dispatch = useDispatch();

  const ga4React = useGA4React();

  const apiEndpoint = useAppSelector(selectApiEndpoint);
  const {targetTestId, targetTestExecutionId} = useAppSelector(selectRedirectTarget);

  const [contentProps, setContentProps] = useState<OnDataChangeInterface>({
    data: [],
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

  const onDataChange = (args: OnDataChangeInterface) => {
    setContentProps(args);
  };

  const dataLayers: any = {
    'Test Suites': <TestSuitesDataLayer onDataChange={onDataChange} queryFilters={queryFilters} />,
    Tests: <TestsDataLayer onDataChange={onDataChange} queryFilters={queryFilters} />,
  };

  useEffect(() => {
    if (!setData || contentProps.isLoading || contentProps.isFetching) {
      return;
    }

    if (contentProps.data && contentProps.data.length) {
      dispatch(setData(contentProps.data));

      return;
    }

    if (!contentProps.data || !contentProps.data.length) {
      // if no results - set result as an empty array because not all the time we get an empty array from backend
      dispatch(setData([]));

      // if no results - deselect the row
      if (canSelectRow && selectedRecord) {
        dispatch(setSelectedRecord({selectedRecord: null}));
      }
    }
  }, [contentProps.data, contentProps.isLoading, contentProps.isFetching]);

  useEffect(() => {
    contentProps?.refetch();
  }, [apiEndpoint, queryFilters]);

  useEffect(() => {
    if (!targetTestId && !targetTestExecutionId) {
      closeSecondLevel();
    }
  }, [selectedRecord]);

  useEffect(() => {
    if (selectedRecord) {
      dispatch(setSelectedRecord({selectedRecord: null}));
    }
  }, [entityType]);

  useEffect(() => {
    if (ga4React) {
      ga4React.gtag('event', 'get_dashboard_results', {dashboard_entity: pageTitle});
    }
  }, [contentProps.data, ga4React]);

  useEffect(() => {
    if (contentProps.data && contentProps.data?.length) {
      if (targetTestId) {
        // @ts-ignore
        const targetTest = contentProps.data?.filter((result: any, index: number) => {
          return result?.test?.name === targetTestId;
        });

        const targetTestArrayIndex = contentProps.data?.indexOf(targetTest[0]) + 1;

        if (targetTest.length) {
          paginationOptions.onChange(Math.ceil(targetTestArrayIndex / 10));
          onRowSelect(targetTest[0].test);
          dispatch(clearTargetTestId());
        }
      }
    }
  }, [contentProps?.data, targetTestId]);

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
        <DashboardTitle>{pageTitle}</DashboardTitle>
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
        <Skeleton
          loading={contentProps.isLoading}
          paragraph={{rows: 5, width: '100%'}}
          additionalStyles={{
            lineHeight: 80,
            container: {
              paddingTop: 16,
            },
          }}
          title={false}
        >
          <StyledContentTable
            dataSource={dataSource}
            columns={[
              {
                render: data => {
                  const {latestExecution, dataItem} = data;
                  let status = null;
                  let recentDate = null;

                  if (latestExecution) {
                    status =
                      entityType !== 'test-suites' ? latestExecution?.executionResult?.status : latestExecution.status;
                    recentDate = moment(latestExecution.endTime).format('MMM D, HH:mm');
                  } else {
                    status = 'neverRun';
                    recentDate = 'The Future';
                  }

                  return (
                    <DashboardTableRow
                      name={dataItem.name}
                      labels={dataItem.labels}
                      latestExecution={latestExecution}
                      status={status}
                      recentDate={recentDate}
                      entityType={entityType}
                      type={dataItem.type}
                      isRowActive={selectedRecord?.name === dataItem?.name}
                    />
                  );
                },
              },
            ]}
            loading={contentProps.isLoading}
            rowSelection={canSelectRow ? rowSelection : undefined}
            rowClassName="dashboard-content-table"
            rowKey={(record: any) => {
              return `${entityType}${
                selectedRecordIdFieldName && record.dataItem[selectedRecordIdFieldName]
                  ? `-${record.dataItem[selectedRecordIdFieldName]}`
                  : ''
              }`;
            }}
            pagination={paginationOptions}
            onRow={(record: any) => ({
              onClick: () => {
                if (canSelectRow) {
                  onRowSelect(record.dataItem);
                }
              },
            })}
            showHeader={false}
          />
        </Skeleton>
      </StyledDashboardContent>
    </StyledDashboardContentContainer>
  );
};

export default DashboardContent;
