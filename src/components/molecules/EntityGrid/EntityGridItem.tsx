import React, {useContext, useRef} from 'react';

import {MainContext} from '@contexts';

import useInViewport from '@hooks/useInViewport';

import {EntityListContext} from '@organisms/EntityList/EntityListContainer/EntityListContainer';

import {PollingIntervals} from '@utils/numbers';

import EntityGridItemPure from './EntityGridItemPure';

const EntityGridItem: React.FC<any> = props => {
  const {item, onClick} = props;
  const {dataItem} = item;

  const {isClusterAvailable} = useContext(MainContext);
  const {useGetMetrics, entity, useAbortAllExecutions} = useContext(EntityListContext);

  const ref = useRef(null);
  const isInViewport = useInViewport(ref);

  const {data: metrics} = useGetMetrics(
    {id: dataItem.name, last: 7, limit: 13},
    {skip: !isInViewport || !isClusterAvailable, pollingInterval: PollingIntervals.halfMin}
  );

  const [abortAllExecutions] = useAbortAllExecutions();

  return (
    <EntityGridItemPure
      ref={ref}
      item={item}
      onClick={onClick}
      entity={entity}
      metrics={metrics}
      abortAllExecutions={abortAllExecutions}
    />
  );
};

export default EntityGridItem;
