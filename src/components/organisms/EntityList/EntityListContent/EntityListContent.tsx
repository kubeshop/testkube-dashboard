import React, {memo, useContext, useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';
import {usePrevious} from 'react-use';

import {initialPageSize} from '@redux/initialState';

import {LoadingOutlined} from '@ant-design/icons';

import {Entity, EntityListBlueprint} from '@models/entity';
import {ModalConfigProps} from '@models/modal';
import {OnDataChangeInterface} from '@models/onDataChange';

import {Button, Modal} from '@custom-antd';

import {ScrollTrigger} from '@atoms';
import {EntityGrid} from '@molecules';

import useTrackTimeAnalytics from '@hooks/useTrackTimeAnalytics';

import {useApiEndpoint} from '@services/apiEndpoint';

import {compareFiltersObject} from '@utils/objects';

import {Permissions, usePermission} from '@permissions/base';

import {MainContext} from '@contexts';

import {TestModalConfig, TestSuiteModalConfig} from '../EntityCreationModal';
import {EntityListContext} from '../EntityListContainer/EntityListContainer';
import Filters from '../EntityListFilters';
import EmptyDataWithFilters from './EmptyDataWithFilters';
import {TestsDataLayer, TestSuitesDataLayer} from './EntityDataLayers';
import {EmptyListWrapper, Header, StyledContainer, StyledFiltersSection} from './EntityListContent.styled';
import EntityListTitle from './EntityListHeader';
import EntityListSkeleton from './EntityListSkeleton';
import EntityListLoader from './EntityListLoader';

const modalTypes: {[key in Entity]: ModalConfigProps} = {
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

  const {dispatch, navigate, isClusterAvailable} = useContext(MainContext);
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

  const dataLayers: {[key in Entity]: any} = {
    tests: <TestsDataLayer onDataChange={onDataChange} queryFilters={queryFilters} />,
    'test-suites': <TestSuitesDataLayer onDataChange={onDataChange} queryFilters={queryFilters} />,
  };

  const resetFilters = () => {
    dispatch(setQueryFilters(initialFiltersState));
  };

  const onNavigateToDetails = (item: any) => {
    navigate(`${entity}/executions/${item.dataItem.name}`);
  };

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

    try {
      contentProps.refetch().then(() => {
        setIsApplyingFilters(false);
        setIsLoadingNext(false);
      });
    } catch (err: any) {
      // RTK is failing synchronously if there was it was skipped
      if (!err?.message.includes('not been started yet')) {
        throw err;
      }
    }
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
      <Helmet>
        <title>{`${pageTitle} | Testkube`}</title>
        <meta name="description" content={`${PageDescription}`} />
      </Helmet>
      {dataLayers[entity]}
      <Header>
        <EntityListTitle
          pageTitle={
            <>
              {pageTitle} {isApplyingFilters && !isFirstTimeLoading ? <LoadingOutlined /> : null}
            </>
          }
        >
          <PageDescription />
        </EntityListTitle>
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
              <Button $customType="primary" onClick={addEntityAction} data-test={dataTestID} disabled={!isClusterAvailable}>
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
      ) : <>
        <EntityGrid data={dataSource} onNavigateToDetails={onNavigateToDetails} />
        <ScrollTrigger
          offset={200}
          disabled={queryFilters.pageSize > dataSource.length || isLoadingNext}
          onScroll={onScrollBottom}
        />
        {isLoadingNext ? <EntityListLoader /> : null}
      </>}
      {isModalVisible ? (
        <Modal {...creationModalConfig} setIsModalVisible={setIsModalVisible} isModalVisible={isModalVisible} />
      ) : null}
    </StyledContainer>
  );
};

export default memo(EntityListContent);
