import React, {FC, ReactElement, ReactNode, memo, useMemo} from 'react';

import {ScrollTrigger} from '@atoms';

import EntityListLoader from '@organisms/EntityList/EntityListContent/EntityListLoader';
import EntityListSkeleton from '@organisms/EntityList/EntityListContent/EntityListSkeleton';

import {StyledEntityGrid} from '../EntityGrid/EntityGrid.styled';

type OptionalProp<T, U extends keyof T> = Omit<T, U> & Partial<Pick<T, U>>;

type BaseEntityGridProps<T extends {item: any}> = {
  data?: T['item'][];
  Component: FC<T>;
  componentProps: Omit<T, 'item'>;
  empty: ReactElement<any, any>;
  loadingInitially?: boolean;
  loadingMore?: boolean;
  hasMore?: boolean;
  scrollOffset?: number;
  onScrollEnd?: () => void;
};

type EntityGridProps<T extends {item: any}> = {} extends Omit<T, 'item' | 'key'>
  ? OptionalProp<BaseEntityGridProps<T>, 'componentProps'>
  : BaseEntityGridProps<T>;

function EntityGrid<T extends {item: any}>(props: EntityGridProps<T>): ReactElement<any, any> {
  const {
    data,
    Component,
    loadingInitially = false,
    loadingMore = false,
    hasMore = false,
    empty,
    scrollOffset = 200,
    componentProps,
    onScrollEnd,
  } = props;

  const elements = useMemo(
    () =>
      data?.map((item, index) => {
        const itemProps = {...componentProps, item} as T;
        // eslint-disable-next-line react/no-array-index-key
        return <Component {...itemProps} key={`entity_grid_item-${index}`} />;
      }),
    [data]
  );

  if (loadingInitially) {
    // TODO: Allow passing expected height for skeleton
    return <EntityListSkeleton />;
  }

  if (!loadingInitially && !data?.length) {
    return empty;
  }

  return (
    <>
      <StyledEntityGrid>{elements}</StyledEntityGrid>
      {/* FIXME: It should wait a moment until is enabled again */}
      <ScrollTrigger offset={scrollOffset} disabled={!hasMore || loadingMore} onScroll={onScrollEnd} />
      {loadingMore ? <EntityListLoader /> : null}
    </>
  );
}

export default memo(EntityGrid) as typeof EntityGrid;
