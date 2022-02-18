import {useState} from 'react';
import {useDispatch} from 'react-redux';

import {TablePaginationConfig} from 'antd';

import {DashboardBlueprint} from '@models/dashboard';

import {useAppSelector} from '@redux/hooks';
import {selectApiEndpoint} from '@redux/reducers/configSlice';

import {DashboardContent, DashboardInfoPanel} from '@organisms';

import useUpdateURLSearchParams from '@hooks/useUpdateURLSearchParams';

import {StyledDashboardContainerWrapper} from './DashboardContainer.styled';

const DashboardContainer: React.FC<DashboardBlueprint> = props => {
  const {
    hasInfoPanel,
    pageTitle,
    // useGetData,
    setData,
    columns,
    selectData,
    selectQueryFilters,
    selectAllFilters,
    setSelectedRecord,
    selectSelectedRecord,
    canSelectRow,
    selectedRecordIdFieldName,
    testTypeFieldName,
    infoPanelComponent,
    setQueryFilters,
    infoPanelConfig,
    filtersComponentsIds,
    entityType,
  } = props;

  const dispatch = useDispatch();

  const dataSource: any = useAppSelector(selectData);
  console.log('dataSource: ', dataSource);
  const selectedRecord: any = useAppSelector(selectSelectedRecord);
  console.log('selectedRecord: ', selectedRecord);
  const queryFilters: any = useAppSelector(selectQueryFilters);
  console.log('queryFilters: ', queryFilters);
  const allFilters: any = useAppSelector(selectAllFilters);
  const apiEndpoint = useAppSelector(selectApiEndpoint);

  useUpdateURLSearchParams(queryFilters);

  const [isInfoPanelExpanded, setInfoPanelVisibility] = useState(true);

  // const {data, isLoading, isFetching, refetch} = useGetData(queryFilters || null, {
  //   pollingInterval: 5000,
  // });

  const onRowSelect = (rowRecord: any) => {
    if (!isInfoPanelExpanded) {
      setInfoPanelVisibility(true);
    }

    dispatch(setSelectedRecord({selectedRecord: rowRecord}));
  };

  // useEffect(() => {
  //   if (!setData) {
  //     return;
  //   }

  //   if (data === null || data?.results === []) {
  //     dispatch(setData([]));

  //     if (canSelectRow) {
  //       dispatch(setSelectedRecord({selectedRecord: null}));
  //     }

  //     return;
  //   }

  //   if (data) {
  //     dispatch(setData(data));

  //     if (canSelectRow) {
  //       dispatch(setSelectedRecord(data));
  //     }
  //   }
  // }, [data]);

  // useEffect(() => {
  //   refetch();
  // }, [apiEndpoint]);

  const shouldInfoPanelBeShown = hasInfoPanel && dataSource?.length;

  const pagination: TablePaginationConfig = {
    onChange: (page: number, pageSize?: number) => {
      dispatch(setQueryFilters({...queryFilters, page: page - 1, pageSize}));
    },

    onShowSizeChange: (page, pageSize) => {
      dispatch(setQueryFilters({...queryFilters, page: 0, pageSize}));
    },

    ...(allFilters.totals?.results ? {total: allFilters.totals?.results} : {}),

    ...(queryFilters.page ? {current: queryFilters.page + 1} : {}),

    ...(queryFilters.pageSize ? {pageSize: queryFilters.pageSize} : {}),

    hideOnSinglePage: true,
  };

  // TODO: get rid of this props drilling
  return (
    <StyledDashboardContainerWrapper>
      <DashboardContent
        pageTitle={pageTitle}
        dataSource={dataSource}
        columns={columns}
        // isLoading={isLoading}
        // isFetching={isFetching}
        queryFilters={queryFilters}
        canSelectRow={canSelectRow}
        onRowSelect={onRowSelect}
        selectedRecord={selectedRecord}
        selectedRecordIdFieldName={selectedRecordIdFieldName}
        shouldInfoPanelBeShown={shouldInfoPanelBeShown}
        isInfoPanelExpanded={isInfoPanelExpanded}
        setSelectedRecord={setSelectedRecord}
        paginationOptions={pagination}
        setQueryFilters={setQueryFilters}
        filtersComponentsIds={filtersComponentsIds}
        entityType={entityType}
        setData={setData}
      />
      <DashboardInfoPanel
        shouldInfoPanelBeShown={shouldInfoPanelBeShown}
        selectedRecord={selectedRecord}
        testTypeFieldName={testTypeFieldName}
        isInfoPanelExpanded={isInfoPanelExpanded}
        setInfoPanelVisibility={setInfoPanelVisibility}
        infoPanelComponent={infoPanelComponent}
        infoPanelConfig={infoPanelConfig}
      />
    </StyledDashboardContainerWrapper>
  );
};

export default DashboardContainer;
