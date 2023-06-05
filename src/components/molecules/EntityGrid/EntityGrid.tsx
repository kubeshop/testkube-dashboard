import React, {FC, ReactElement, memo, useMemo} from 'react';

import {ScrollTrigger} from '@atoms';

import {StyledEntityGrid} from './EntityGrid.styled';
import EntityGridLoader from './EntityGridLoader';
import EntityGridSkeleton from './EntityGridSkeleton';

type OptionalProp<T, U extends keyof T> = Omit<T, U> & Partial<Pick<T, U>>;

type BaseEntityGridProps<T extends {item: any}> = {
  data?: T['item'][];
  Component: FC<T>;
  componentProps: Omit<T, 'item'>;
  itemHeight?: number;
  scrollOffset?: number;
  empty: ReactElement<any, any>;
  loadingInitially?: boolean;
  loadingMore?: boolean;
  hasMore?: boolean;
  onScrollEnd?: () => void;
};

type EntityGridProps<T extends {item: any}> = {} extends Omit<T, 'item' | 'key'>
  ? OptionalProp<BaseEntityGridProps<T>, 'componentProps'>
  : BaseEntityGridProps<T>;

function EntityGrid<T extends {item: any}>(props: EntityGridProps<T>): ReactElement<any, any> {
  const {
    data,
    Component,
    componentProps,
    itemHeight = 150,
    scrollOffset,
    empty,
    loadingInitially = false,
    loadingMore = false,
    hasMore = false,
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
    return <EntityGridSkeleton height={itemHeight} />;
  }

  if (!loadingInitially && !data?.length) {
    return empty;
  }

  return (
    <>
      <StyledEntityGrid>{elements}</StyledEntityGrid>
      <ScrollTrigger
        offset={scrollOffset ?? itemHeight * 1.5}
        disabled={!hasMore || loadingMore}
        onScroll={onScrollEnd}
      />
      {loadingMore ? <EntityGridLoader /> : null}
    </>
  );
}

// Must be cast back, so generics will work
export default memo(EntityGrid) as typeof EntityGrid;
