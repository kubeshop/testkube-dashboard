import React, {memo, useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';

import {isEqual, merge} from 'lodash';

import {Button} from '@custom-antd';

import {SystemAccess, useSystemAccess} from '@hooks/useSystemAccess';
import useTrackTimeAnalytics from '@hooks/useTrackTimeAnalytics';

import {EntityListBlueprint} from '@models/entity';

import {EntityGrid} from '@molecules';

import {PageHeader, PageToolbar, PageWrapper} from '@organisms';

import PageMetadata from '@pages/PageMetadata';

import {Permissions, usePermission} from '@permissions/base';

import {initialPageSize} from '@redux/initialState';

import {useApiEndpoint} from '@services/apiEndpoint';

import Filters from '../EntityListFilters';

import EmptyDataWithFilters from './EmptyDataWithFilters';
import {StyledFiltersSection} from './EntityListContent.styled';

const EntityListContent: React.FC<EntityListBlueprint> = props => {
  const {
    itemKey,
    pageTitle,
    pageTitleAddon,
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
    onAdd,
    onItemClick,
    onItemAbort,
  } = props;

  const [isFirstTimeLoading, setFirstTimeLoading] = useState(true);
  const [isApplyingFilters, setIsApplyingFilters] = useState(false);
  const [isLoadingNext, setIsLoadingNext] = useState(false);

  const isReadable = useSystemAccess(SystemAccess.system);
  const isWritable = useSystemAccess(SystemAccess.agent);
  const apiEndpoint = useApiEndpoint();
  const mayCreate = usePermission(Permissions.createEntity);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const filters = merge({}, initialFiltersState, queryFilters, {
      textSearch: searchParams.get('textSearch') ?? undefined,
      status: searchParams.get('status')?.split(',').filter(Boolean) ?? undefined,
      selector: searchParams.get('selector') ?? undefined,
    });
    if (!isEqual(filters, queryFilters)) {
      setQueryFilters(filters);
    }
  }, []);

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (queryFilters.textSearch) {
      newSearchParams.set('textSearch', queryFilters.textSearch);
    } else {
      newSearchParams.delete('textSearch');
    }
    if (queryFilters.status?.length) {
      newSearchParams.set('status', queryFilters.status.join(','));
    } else {
      newSearchParams.delete('status');
    }
    if (queryFilters.selector) {
      newSearchParams.set('selector', queryFilters.selector);
    } else {
      newSearchParams.delete('selector');
    }
    setSearchParams(newSearchParams);
  }, [queryFilters]);

  const resetFilters = () => {
    setQueryFilters(initialFiltersState);
  };

  const onScrollBottom = () => {
    setIsLoadingNext(true);
    setQueryFilters({...queryFilters, pageSize: queryFilters.pageSize + initialPageSize});
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

  useTrackTimeAnalytics(`${entity}-list`);

  const createButton = mayCreate ? (
    <Button $customType="primary" onClick={onAdd} data-test={dataTest} disabled={!isWritable}>
      {addEntityButtonText}
    </Button>
  ) : null;

  return (
    <PageWrapper>
      <PageMetadata title={pageTitle} />

      <PageHeader
        title={pageTitle}
        pageTitleAddon={pageTitleAddon}
        description={<PageDescription />}
        loading={isApplyingFilters && !isFirstTimeLoading}
      >
        <PageToolbar extra={createButton}>
          <StyledFiltersSection>
            <Filters
              setFilters={setQueryFilters}
              filters={queryFilters}
              isFiltersDisabled={isEmptyData || !isReadable}
            />
          </StyledFiltersSection>
        </PageToolbar>
      </PageHeader>

      <EntityGrid
        itemKey={itemKey}
        maxColumns={2}
        data={data}
        Component={CardComponent}
        componentProps={{onClick: onItemClick, onAbort: onItemAbort}}
        empty={
          isFiltersEmpty ? (
            <EmptyData action={onAdd} isClusterAvailable={isWritable} />
          ) : (
            <EmptyDataWithFilters resetFilters={resetFilters} />
          )
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
