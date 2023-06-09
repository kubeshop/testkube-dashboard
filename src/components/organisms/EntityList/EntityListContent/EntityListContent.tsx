import React, {memo, useCallback, useContext, useEffect, useState} from 'react';

import {isEqual} from 'lodash';

import {DashboardContext, MainContext} from '@contexts';

import {Button, Modal} from '@custom-antd';

import useTrackTimeAnalytics from '@hooks/useTrackTimeAnalytics';

import {Entity, EntityListBlueprint} from '@models/entity';
import {ModalConfigProps} from '@models/modal';

import {EntityGrid} from '@molecules';
import {Item} from '@molecules/EntityGrid/EntityGridItemPure';

import {PageHeader, PageToolbar, PageWrapper} from '@organisms';

import PageMetadata from '@pages/PageMetadata';

import {Permissions, usePermission} from '@permissions/base';

import {initialPageSize} from '@redux/initialState';

import {useApiEndpoint} from '@services/apiEndpoint';

import {TestModalConfig, TestSuiteModalConfig} from '../EntityCreationModal';
import Filters from '../EntityListFilters';

import EmptyDataWithFilters from './EmptyDataWithFilters';
import {EmptyListWrapper, StyledFiltersSection} from './EntityListContent.styled';

const modalTypes: Record<Entity, ModalConfigProps> = {
  'test-suites': TestSuiteModalConfig,
  tests: TestModalConfig,
};

const EntityListContent: React.FC<EntityListBlueprint> = props => {
  const {
    pageTitle,
    pageDescription: PageDescription,
    emptyDataComponent: EmptyData,
    CardComponent,
    entity,
    setData,
    initialFiltersState,
    addEntityButtonText,
    dataTest,
    data = [],
    isLoading = false,
    isFetching = false,
    queryFilters,
    dataSource,
    setQueryFilters,
  } = props;

  const [isFirstTimeLoading, setFirstTimeLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isApplyingFilters, setIsApplyingFilters] = useState(false);
  const [isLoadingNext, setIsLoadingNext] = useState(false);

  const {dispatch, isClusterAvailable} = useContext(MainContext);
  const {navigate} = useContext(DashboardContext);
  const apiEndpoint = useApiEndpoint();
  const mayCreate = usePermission(Permissions.createEntity);

  const resetFilters = () => {
    dispatch(setQueryFilters(initialFiltersState));
  };

  const onNavigateToDetails = useCallback(
    (item: Item) => {
      navigate(`/${entity}/executions/${item.name}`);
    },
    [navigate, entity]
  );

  const onScrollBottom = () => {
    setIsLoadingNext(true);
    dispatch(setQueryFilters({...queryFilters, pageSize: queryFilters.pageSize + initialPageSize}));
  };

  useEffect(() => {
    if (!setData || isLoading || isFetching) {
      return;
    }
    setFirstTimeLoading(false);
    dispatch(setData(data || []));
  }, [data, isLoading, isFetching]);

  useEffect(() => {
    setFirstTimeLoading(true);
  }, [entity, apiEndpoint]);

  useEffect(() => {
    setIsApplyingFilters(true);
  }, [queryFilters]);

  useEffect(() => {
    if (!isFetching) {
      setIsLoadingNext(false);
      setIsApplyingFilters(false);
    }
  }, [isFetching]);

  const isFiltersEmpty = isEqual(initialFiltersState, queryFilters);
  const isEmptyData = (dataSource?.length === 0 || !dataSource) && isFiltersEmpty && !isLoading;

  const addEntityAction = () => {
    setIsModalVisible(true);
  };

  const creationModalConfig: ModalConfigProps = modalTypes[entity];

  useTrackTimeAnalytics(`${entity}-list`);

  const createButton = mayCreate ? (
    <Button $customType="primary" onClick={addEntityAction} data-test={dataTest} disabled={!isClusterAvailable}>
      {addEntityButtonText}
    </Button>
  ) : null;

  return (
    <PageWrapper>
      <PageMetadata title={pageTitle} />

      <PageHeader
        title={pageTitle}
        description={<PageDescription />}
        loading={isApplyingFilters && !isFirstTimeLoading}
      >
        <PageToolbar extra={createButton}>
          <StyledFiltersSection>
            <Filters
              setFilters={setQueryFilters}
              filters={queryFilters}
              entity={entity}
              isFiltersDisabled={isEmptyData || !isClusterAvailable}
            />
          </StyledFiltersSection>
        </PageToolbar>
      </PageHeader>

      <EntityGrid
        maxColumns={2}
        data={dataSource}
        Component={CardComponent}
        componentProps={{onClick: onNavigateToDetails}}
        empty={
          <EmptyListWrapper>
            {isFiltersEmpty ? (
              <EmptyData action={addEntityAction} />
            ) : (
              <EmptyDataWithFilters resetFilters={resetFilters} />
            )}
          </EmptyListWrapper>
        }
        itemHeight={163.85}
        loadingInitially={isFirstTimeLoading}
        loadingMore={isLoadingNext}
        hasMore={!isLoadingNext && queryFilters.pageSize <= dataSource.length}
        onScrollEnd={onScrollBottom}
      />
      {isModalVisible ? (
        <Modal {...creationModalConfig} setIsModalVisible={setIsModalVisible} isModalVisible={isModalVisible} />
      ) : null}
    </PageWrapper>
  );
};

export default memo(EntityListContent);
