import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';

import {useGA4React} from 'ga-4-react';

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
    useGetData,
    setData,
    columns,
    selectData,
    selectQueryFilters,
    selectAllFilters,
    setSelectedRecord,
    selectSelectedRecord,
    canSelectRow,
    selectedRecordIdFieldName,
    scriptTypeFieldName,
    infoPanelComponent,
    setQueryFilters,
    infoPanelConfig,
    filtersComponentsIds,
    entityType,
  } = props;

  const ga4React = useGA4React();

  const dispatch = useDispatch();

  const dataSource: any = useAppSelector(selectData);
  const selectedRecord: any = useAppSelector(selectSelectedRecord);
  const queryFilters: any = useAppSelector(selectQueryFilters);
  const allFilters: any = useAppSelector(selectAllFilters);
  const apiEndpoint = useAppSelector(selectApiEndpoint);

  useUpdateURLSearchParams(queryFilters);

  const [isInfoPanelExpanded, setInfoPanelVisibility] = useState(true);

  const {data, isLoading, isFetching, refetch} = useGetData(queryFilters || null, {
    pollingInterval: 5000,
  });

  const onRowSelect = (rowRecord: any) => {
    if (!isInfoPanelExpanded) {
      setInfoPanelVisibility(true);
    }

    dispatch(setSelectedRecord({selectedRecord: rowRecord}));
  };

  useEffect(() => {
    if (data === null || data?.results === []) {
      if (canSelectRow) {
        dispatch(setSelectedRecord({selectedRecord: null}));
      }

      dispatch(setData([]));

      return;
    }

    if (setData && data) {
      dispatch(setData(data));

      if (canSelectRow) {
        dispatch(setSelectedRecord(data));
      }
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [apiEndpoint]);

  const shouldInfoPanelBeShown = hasInfoPanel;

  const pagination = {
    onChange: (page: number, pageSize: number) => {
      dispatch(setQueryFilters({...queryFilters, page: page - 1, pageSize}));
    },

    ...(allFilters.filtered.results ? {total: allFilters?.filtered.results} : {}),

    ...(queryFilters.page ? {current: queryFilters.page + 1} : {}),
    ...(queryFilters.pageSize ? {pageSize: queryFilters.pageSize} : {}),

    hideOnSinglePage: true,
  };

  useEffect(() => {
    if (ga4React) {
      ga4React.gtag('event', 'get_dashboard_results', {dashboard_entity: pageTitle});
    }
  }, [data, ga4React]);

  // TODO: get rid of this props drilling
  return (
    <StyledDashboardContainerWrapper>
      <DashboardContent
        pageTitle={pageTitle}
        dataSource={dataSource}
        columns={columns}
        isLoading={isLoading}
        isFetching={isFetching}
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
      />
      <DashboardInfoPanel
        shouldInfoPanelBeShown={shouldInfoPanelBeShown}
        selectedRecord={selectedRecord}
        scriptTypeFieldName={scriptTypeFieldName}
        isInfoPanelExpanded={isInfoPanelExpanded}
        setInfoPanelVisibility={setInfoPanelVisibility}
        infoPanelComponent={infoPanelComponent}
        infoPanelConfig={infoPanelConfig}
      />
    </StyledDashboardContainerWrapper>
  );
};

export default DashboardContainer;
