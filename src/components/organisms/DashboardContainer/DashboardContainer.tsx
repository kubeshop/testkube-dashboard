import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';

import {DashboardBlueprint} from '@models/dashboard';

import {useAppSelector} from '@redux/hooks';

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
    filtersComponent,
    setSelectedRecord,
    selectSelectedRecord,
    canSelectRow,
    selectedRecordIdFieldName,
    scriptTypeFieldName,
    infoPanelComponent,
    setQueryFilters,
  } = props;

  const dispatch = useDispatch();

  const dataSource: any = useAppSelector(selectData);
  const selectedRecord: any = useAppSelector(selectSelectedRecord);
  const queryFilters: any = useAppSelector(selectQueryFilters);
  const allFilters: any = useAppSelector(selectAllFilters);

  useUpdateURLSearchParams(queryFilters);

  const [isInfoPanelExpanded, setInfoPanelVisibility] = useState(true);

  const {data, isLoading} = useGetData(queryFilters || null, {
    pollingInterval: 5000,
  });

  const onRowSelect = (rowRecord: any) => {
    if (!isInfoPanelExpanded) {
      setInfoPanelVisibility(true);
    }

    dispatch(setSelectedRecord({selectedRecord: rowRecord}));
  };

  useEffect(() => {
    if (setData && data) {
      dispatch(setData(data));

      if (!selectedRecord) {
        dispatch(setSelectedRecord(data));
      }
    }
  }, [data]);

  const shouldInfoPanelBeShown = hasInfoPanel;

  const pagination = {
    onChange: (page: number, pageSize: number) => {
      dispatch(setQueryFilters({...queryFilters, page: page - 1, pageSize}));
    },

    total: allFilters?.filtered.results,
    current: queryFilters.page + 1,
    pageSize: queryFilters.pageSize,
    hideOnSinglePage: true,
  };

  return (
    <StyledDashboardContainerWrapper>
      <DashboardContent
        pageTitle={pageTitle}
        dataSource={dataSource}
        columns={columns}
        isLoading={isLoading}
        filtersComponent={filtersComponent}
        queryFilters={queryFilters}
        canSelectRow={canSelectRow}
        onRowSelect={onRowSelect}
        selectedRecord={selectedRecord}
        selectedRecordIdFieldName={selectedRecordIdFieldName}
        shouldInfoPanelBeShown={shouldInfoPanelBeShown}
        isInfoPanelExpanded={isInfoPanelExpanded}
        setSelectedRecord={setSelectedRecord}
        paginationOptions={pagination}
      />
      {shouldInfoPanelBeShown && selectedRecord && (
        <DashboardInfoPanel
          selectedRecord={selectedRecord}
          scriptTypeFieldName={scriptTypeFieldName}
          isInfoPanelExpanded={isInfoPanelExpanded}
          setInfoPanelVisibility={setInfoPanelVisibility}
          infoPanelComponent={infoPanelComponent}
        />
      )}
    </StyledDashboardContainerWrapper>
  );
};

export default DashboardContainer;
