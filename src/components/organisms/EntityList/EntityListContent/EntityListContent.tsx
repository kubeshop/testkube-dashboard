import React, {memo, useCallback, useContext, useEffect, useState} from 'react';

import {isEqual} from 'lodash';

import {DashboardContext, MainContext, ModalContext} from '@contexts';

import {Button} from '@custom-antd';

import useTrackTimeAnalytics from '@hooks/useTrackTimeAnalytics';

import {EntityListBlueprint} from '@models/entity';

import {EntityGrid} from '@molecules';
import {Item} from '@molecules/EntityGrid/EntityGridItemPure';

import {PageHeader, PageToolbar, PageWrapper} from '@organisms';

import PageMetadata from '@pages/PageMetadata';

import {Permissions, usePermission} from '@permissions/base';

import {initialPageSize} from '@redux/initialState';

import {useApiEndpoint} from '@services/apiEndpoint';

import Filters from '../EntityListFilters';

import EmptyDataWithFilters from './EmptyDataWithFilters';
import {EmptyListWrapper, StyledFiltersSection} from './EntityListContent.styled';

const EntityListContent: React.FC<EntityListBlueprint> = props => {
  const {
    pageTitle,
    pageDescription: PageDescription,
    emptyDataComponent: EmptyData,
    CardComponent,
    entity,
    initialFiltersState,
    addEntityButtonText,
    dataTest,
    isLoading = false,
    isFetching = false,
    queryFilters,
    data,
    setQueryFilters,
    createModalConfig,
  } = props;

  const [isFirstTimeLoading, setFirstTimeLoading] = useState(true);
  const [isApplyingFilters, setIsApplyingFilters] = useState(false);
  const [isLoadingNext, setIsLoadingNext] = useState(false);

  const {dispatch, isClusterAvailable} = useContext(MainContext);
  const {navigate} = useContext(DashboardContext);
  const {setModalConfig, setModalOpen} = useContext(ModalContext);
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
    if (!isLoading && !isFetching) {
      setFirstTimeLoading(false);
    }
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
  const isEmptyData = !data?.length && isFiltersEmpty && !isLoading;

  const addEntityAction = () => {
    setModalConfig(createModalConfig);
    setModalOpen(true);
  };

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
              isFiltersDisabled={isEmptyData || !isClusterAvailable}
            />
          </StyledFiltersSection>
        </PageToolbar>
      </PageHeader>

      <EntityGrid
        maxColumns={2}
        data={data}
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
        hasMore={!isLoadingNext && data && queryFilters.pageSize <= data.length}
        onScrollEnd={onScrollBottom}
      />
    </PageWrapper>
  );
};

export default memo(EntityListContent);
