import React, {useContext, useRef} from 'react';

import {EntityListContext, MainContext} from '@contexts';

import useInViewport from '@hooks/useInViewport';

import {PollingIntervals} from '@utils/numbers';

import EntityGridItemPure from './EntityGridItemPure';

const EntityGridItem: React.FC<any> = props => {
  const {item, onClick} = props;
  const {dataItem, latestExecution} = item;

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
      item={dataItem}
      latestExecution={latestExecution}
      onClick={onClick}
      metrics={metrics}
      dataTest={`${entity}-list-item`}
    />
  );
};

export default EntityGridItem;
