import React, {useContext, useRef} from 'react';

import {EntityListContext} from '@organisms/EntityList/EntityListContainer/EntityListContainer';

import useInViewport from '@hooks/useInViewport';

import {PollingIntervals} from '@utils/numbers';

import {MainContext} from '@contexts';

import EntityGridItemPure from './EntityGridItemPure';

const EntityGridItem: React.FC<any> = props => {
  const {item, onClick} = props;
  const {dataItem} = item;

  const {isClusterAvailable} = useContext(MainContext);
  const {useGetMetrics, entity} = useContext(EntityListContext);

  const ref = useRef(null);
  const isInViewport = useInViewport(ref);

  const {data: metrics} = useGetMetrics(
    {id: dataItem.name, last: 7, limit: 13},
    {skip: !isInViewport || !isClusterAvailable, pollingInterval: PollingIntervals.halfMin}
  );

  return (
    <EntityGridItemPure
      ref={ref}
      item={item}
      onClick={onClick}
      entity={entity}
      metrics={metrics}
    />
  );
};

export default EntityGridItem;
