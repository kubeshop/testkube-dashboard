import React, {memo, useCallback, useContext, useEffect, useState} from 'react';
import {usePrevious} from 'react-use';

import {ScrollTrigger} from '@atoms';

import {DashboardContext, MainContext} from '@contexts';

import {Button, Modal} from '@custom-antd';

import useTrackTimeAnalytics from '@hooks/useTrackTimeAnalytics';

import {Entity, EntityListBlueprint} from '@models/entity';
import {ModalConfigProps} from '@models/modal';
import {OnDataChangeInterface} from '@models/onDataChange';
import {TestWithExecutionRedux} from '@models/test';
import {TestSuiteWithExecutionRedux} from '@models/testSuite';

import {EntityGrid} from '@molecules';

import {Permissions, usePermission} from '@permissions/base';

import {initialPageSize} from '@redux/initialState';

import {useApiEndpoint} from '@services/apiEndpoint';

import Head from '@src/Head';

import {safeRefetch} from '@utils/fetchUtils';
import {compareFiltersObject} from '@utils/objects';

import {TestModalConfig, TestSuiteModalConfig} from '../EntityCreationModal';
import {EntityListContext} from '../EntityListContainer/EntityListContainer';
import Filters from '../EntityListFilters';

import EmptyDataWithFilters from './EmptyDataWithFilters';
import {TestSuitesDataLayer} from './EntityDataLayers';
import {EmptyListWrapper, Header, StyledContainer, StyledFiltersSection} from './EntityListContent.styled';
import EntityListHeader from './EntityListHeader';
import EntityListLoader from './EntityListLoader';
import EntityListSkeleton from './EntityListSkeleton';

const modalTypes: Record<Entity, ModalConfigProps> = {
  'test-suites': TestSuiteModalConfig,
  tests: TestModalConfig,
};

const EntityListContent: React.FC<EntityListBlueprint> = props => {
  const {
    pageTitle,
    pageDescription: PageDescription,
    emptyDataComponent: EmptyData,
    entity,
    filtersComponentsIds,
    setData,
    initialFiltersState,
    addEntityButtonText,
    dataTestID,
  } = props;

  const [isFirstTimeLoading, setFirstTimeLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isApplyingFilters, setIsApplyingFilters] = useState(false);
  const [isLoadingNext, setIsLoadingNext] = useState(false);

  const {dispatch, isClusterAvailable} = useContext(MainContext);
  const {navigate} = useContext(DashboardContext);
  const apiEndpoint = useApiEndpoint();
  const mayCreate = usePermission(Permissions.createEntity);
  const {queryFilters, dataSource, setQueryFilters} = useContext(EntityListContext);
  const prevQueryFilters = usePrevious(queryFilters) || queryFilters;

  const [contentProps, setContentProps] = useState<OnDataChangeInterface>({
    data: [],
    isLoading: false,
    isFetching: false,
    refetch: () => Promise.resolve(),
  });

  const onDataChange = (args: OnDataChangeInterface) => {
    setContentProps(args);
  };

  const dataLayers: Partial<Record<Entity, JSX.Element>> = {
    // tests: <TestsDataLayer onDataChange={onDataChange} queryFilters={queryFilters} />,
    'test-suites': <TestSuitesDataLayer onDataChange={onDataChange} queryFilters={queryFilters} />,
  };

  const resetFilters = () => {
    dispatch(setQueryFilters(initialFiltersState));
  };

  const onNavigateToDetails = useCallback(
    (item: TestWithExecutionRedux | TestSuiteWithExecutionRedux) => {
      navigate(`/${entity}/executions/${item.dataItem.name}`);
    },
    [navigate, entity]
  );

  const onScrollBottom = () => {
    dispatch(setQueryFilters({...queryFilters, pageSize: queryFilters.pageSize + initialPageSize}));
  };

  useEffect(() => {
    if (!setData || contentProps.isLoading || contentProps.isFetching) {
      return;
    }

    if (contentProps.data && contentProps.data.length) {
      setFirstTimeLoading(false);
      dispatch(setData(contentProps.data));

      return;
    }

    if (!contentProps.data || !contentProps.data.length) {
      setFirstTimeLoading(false);
      // if no results - set result as an empty array because not all the time we get an empty array from backend
      dispatch(setData([]));
    }
  }, [contentProps.data, contentProps.isLoading, contentProps.isFetching]);

  useEffect(() => {
    setFirstTimeLoading(true);

    return () => {
      setFirstTimeLoading(true);
    };
  }, [entity, apiEndpoint]);

  useEffect(() => {
    setIsApplyingFilters(true);

    if (queryFilters.pageSize > prevQueryFilters.pageSize) {
      setIsLoadingNext(true);
    }

    safeRefetch(contentProps.refetch).then(() => {
      setIsApplyingFilters(false);
      setIsLoadingNext(false);
    });
  }, [queryFilters, contentProps.refetch]);

  const isFiltersEmpty = compareFiltersObject(initialFiltersState, queryFilters);
  const isEmptyData = (dataSource?.length === 0 || !dataSource) && isFiltersEmpty && !contentProps.isLoading;

  const addEntityAction = () => {
    setIsModalVisible(true);
  };

  const creationModalConfig: ModalConfigProps = modalTypes[entity];

  useTrackTimeAnalytics(`${entity}-list`);

  return (
    <StyledContainer>
      {/* FIXME: PageDescription is React component */}
      <Head title={pageTitle} description={`${PageDescription}`} />

      {dataLayers[entity]}
      <Header>
        <EntityListHeader
          loading={isApplyingFilters && !isFirstTimeLoading}
          title={pageTitle}
          description={<PageDescription />}
        />
        {filtersComponentsIds && filtersComponentsIds.length ? (
          <StyledFiltersSection>
            <Filters
              setFilters={setQueryFilters}
              filters={queryFilters}
              filtersComponentsIds={filtersComponentsIds}
              entity={entity}
              isFiltersDisabled={isEmptyData || !isClusterAvailable}
            />
            {mayCreate ? (
              <Button
                $customType="primary"
                onClick={addEntityAction}
                data-test={dataTestID}
                disabled={!isClusterAvailable}
              >
                {addEntityButtonText}
              </Button>
            ) : null}
          </StyledFiltersSection>
        ) : null}
      </Header>
      {isFirstTimeLoading ? (
        <EntityListSkeleton />
      ) : !dataSource || !dataSource.length ? (
        <EmptyListWrapper>
          {isFiltersEmpty ? (
            <EmptyData action={addEntityAction} />
          ) : (
            <EmptyDataWithFilters resetFilters={resetFilters} />
          )}
        </EmptyListWrapper>
      ) : (
        <>
          <EntityGrid data={dataSource} onNavigateToDetails={onNavigateToDetails} />
          <ScrollTrigger
            offset={200}
            disabled={queryFilters.pageSize > dataSource.length || isLoadingNext}
            onScroll={onScrollBottom}
          />
          {isLoadingNext ? <EntityListLoader /> : null}
        </>
      )}
      {isModalVisible ? (
        <Modal {...creationModalConfig} setIsModalVisible={setIsModalVisible} isModalVisible={isModalVisible} />
      ) : null}
    </StyledContainer>
  );
};

export default memo(EntityListContent);
