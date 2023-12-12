import {useCallback, useEffect, useMemo, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import {useEffectOnce} from 'react-use';

import {isEqual, merge} from 'lodash';

import {Button} from '@custom-antd';

import {SystemAccess, useSystemAccess} from '@hooks/useSystemAccess';
import useTrackTimeAnalytics from '@hooks/useTrackTimeAnalytics';

import {EntityViewBlueprint} from '@models/entity';
import {TestWithExecution} from '@models/test';
import {TestSuiteWithExecution} from '@models/testSuite';

import EntityGrid from '@molecules/EntityGrid';

import {PageHeader, PageToolbar, PageWrapper} from '@organisms';

import PageMetadata from '@pages/PageMetadata';

import {Permissions, usePermission} from '@permissions/base';

import {useTestsSlotFirst} from '@plugins/tests-and-test-suites/hooks';

import {initialPageSize} from '@redux/initialState';

import {useApiEndpoint} from '@services/apiEndpoint';

import EmptyDataWithFilters from './EmptyDataWithFilters';
import * as S from './EntityView.styled';
import EntityViewFilters from './EntityViewFilters';

export type ViewComponentBaseProps = {
  data?: TestWithExecution[] | TestSuiteWithExecution[];
  empty?: JSX.Element;
  hasMore?: boolean;
  loadingInitially?: boolean;
  loadingMore?: boolean;
  onScrollEnd?: () => void;
};

const EntityView: React.FC<EntityViewBlueprint> = props => {
  const {
    addEntityButtonText,
    CardComponent,
    data,
    dataTest,
    emptyDataComponent: EmptyData,
    entity,
    initialFiltersState,
    isFetching,
    isListLoading,
    isLoading,
    itemKey,
    pageDescription: PageDescription,
    pageTitle,
    pageTitleAddon,
    queryFilters,
  } = props;
  const {onAdd, onItemClick, setQueryFilters} = props;

  const [isApplyingFilters, setIsApplyingFilters] = useState(false);
  const [isFirstTimeLoading, setFirstTimeLoading] = useState(!data?.length);
  const [isLoadingNext, setIsLoadingNext] = useState(false);

  const apiEndpoint = useApiEndpoint();
  const canCreateEntity = usePermission(Permissions.createEntity);
  const isReadable = useSystemAccess(SystemAccess.system);
  const isWritable = useSystemAccess(SystemAccess.agent);

  const [searchParams, setSearchParams] = useSearchParams();

  const createButton = useMemo(() => {
    if (canCreateEntity && isWritable) {
      return (
        <Button $customType="primary" onClick={onAdd} data-test={dataTest}>
          {addEntityButtonText}
        </Button>
      );
    }

    return null;
  }, [addEntityButtonText, canCreateEntity, dataTest, isWritable, onAdd]);

  const isFiltersEmpty = isEqual(initialFiltersState, queryFilters);
  const isEmptyData = useMemo(
    () => !data?.length && isFiltersEmpty && !isLoading,
    [data?.length, isFiltersEmpty, isLoading]
  );

  const onScrollBottom = useCallback(() => {
    setIsLoadingNext(true);
    setQueryFilters({...queryFilters, pageSize: queryFilters.pageSize + initialPageSize});
  }, [queryFilters, setQueryFilters]);

  const resetFilters = useCallback(() => {
    setQueryFilters(initialFiltersState);
  }, [initialFiltersState, setQueryFilters]);

  useTrackTimeAnalytics(`${entity}-list`);

  useEffectOnce(() => {
    const filters = merge({}, initialFiltersState, queryFilters, {
      textSearch: searchParams.get('textSearch') ?? undefined,
      status: searchParams.get('status')?.split(',').filter(Boolean) ?? undefined,
      selector: searchParams.get('selector') ?? undefined,
    });
    if (!isEqual(filters, queryFilters)) {
      setQueryFilters(filters);
    }
  });

  useEffect(() => {
    setIsApplyingFilters(true);
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

  useEffect(() => {
    if (!isLoading && !isFetching) {
      setFirstTimeLoading(false);
    }
  }, [data, isLoading, isFetching]);

  useEffect(() => {
    if (isLoading) {
      setFirstTimeLoading(true);
    }
  }, [entity, apiEndpoint]);

  useEffect(() => {
    if (!isFetching) {
      setIsLoadingNext(false);
      setIsApplyingFilters(false);
    }
  }, [isFetching]);

  useEffect(() => {
    if (!isListLoading) return;

    setFirstTimeLoading(true);
  }, [isListLoading]);

  const DefaultViewComponent: React.FC<ViewComponentBaseProps> = useMemo(
    () => componentProps =>
      (
        <EntityGrid
          {...componentProps}
          itemKey={itemKey}
          maxColumns={2}
          Component={CardComponent}
          componentProps={{onClick: onItemClick}}
          itemHeight={163.85}
        />
      ),
    [CardComponent, EmptyData]
  );

  const ViewComponent = useTestsSlotFirst('entityViewComponent', [{value: DefaultViewComponent, metadata: {order: 2}}]);

  return (
    <PageWrapper>
      <PageMetadata title={pageTitle} />

      <PageHeader
        title={pageTitle}
        pageTitleAddon={pageTitleAddon}
        description={PageDescription}
        loading={isApplyingFilters && !isFirstTimeLoading}
      >
        <PageToolbar extra={createButton}>
          <S.FiltersSection>
            <EntityViewFilters
              setFilters={setQueryFilters}
              filters={queryFilters}
              disabled={isEmptyData || !isReadable}
            />
          </S.FiltersSection>
        </PageToolbar>
      </PageHeader>

      {ViewComponent && (
        <ViewComponent
          data={data}
          loadingInitially={isFirstTimeLoading}
          empty={
            isFiltersEmpty ? (
              <EmptyData action={onAdd} isClusterAvailable={isWritable} />
            ) : (
              <EmptyDataWithFilters resetFilters={resetFilters} />
            )
          }
          hasMore={!isLoadingNext && data && queryFilters.pageSize <= data.length}
          loadingMore={isLoadingNext}
          onScrollEnd={onScrollBottom}
        />
      )}
    </PageWrapper>
  );
};

export default EntityView;
