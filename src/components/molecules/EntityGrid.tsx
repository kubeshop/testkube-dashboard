import React, {FC, ReactElement, memo, useMemo} from 'react';

import {get as getIn} from 'lodash';

import {ScrollTrigger} from '@atoms/ScrollTrigger';

import {StyledEntityGrid} from './EntityGrid.styled';
import {EntityGridLoader} from './EntityGrid/EntityGridLoader';
import {EntityGridSkeleton} from './EntityGrid/EntityGridSkeleton';

type OptionalProp<T, U extends keyof T> = Omit<T, U> & Partial<Pick<T, U>>;

type BaseEntityGridProps<T extends {item: any}> = {
  data?: T['item'][];
  Component: FC<T>;
  componentProps: Omit<T, 'item'>;
  maxColumns?: number;
  itemHeight?: number;
  minItemWidth?: number;
  scrollOffset?: number;
  empty?: ReactElement<any, any>;
  loadingInitially?: boolean;
  loadingMore?: boolean;
  hasMore?: boolean;
  onScrollEnd?: () => void;
  itemKey?: string;
};

type EntityGridProps<T extends {item: any}> = {} extends Omit<T, 'item' | 'key'>
  ? OptionalProp<BaseEntityGridProps<T>, 'componentProps'>
  : BaseEntityGridProps<T>;

function EntityGridBase<T extends {item: any}>(props: EntityGridProps<T>): ReactElement<any, any> {
  const {
    data,
    Component,
    componentProps,
    maxColumns,
    itemHeight = 150,
    minItemWidth = 300,
    scrollOffset,
    empty,
    loadingInitially = false,
    loadingMore = false,
    hasMore = false,
    onScrollEnd,
    itemKey,
  } = props;

  const elements = useMemo(
    () =>
      data?.map((item, index) => {
        const itemProps = {...componentProps, item} as T;
        return <Component {...itemProps} key={itemKey ? getIn(item, itemKey) : `item-${index}`} />;
      }),
    [data]
  );

  if (loadingInitially) {
    return <EntityGridSkeleton height={itemHeight} />;
  }

  if (!loadingInitially && !data?.length && empty) {
    return empty;
  }

  return (
    <>
      <StyledEntityGrid $columns={maxColumns} $itemWidth={minItemWidth}>
        {elements}
      </StyledEntityGrid>
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
export const EntityGrid = memo(EntityGridBase) as typeof EntityGridBase;
