import React, {FC, useContext, useRef} from 'react';

import {MainContext} from '@contexts';

import useInViewport from '@hooks/useInViewport';

import {TestWithExecutionRedux} from '@models/test';

import EntityGridItemPure, {Item} from '@molecules/EntityGrid/EntityGridItemPure';

import {useGetTestExecutionMetricsQuery} from '@services/tests';

import {PollingIntervals} from '@utils/numbers';

export interface TestCardProps {
  item: TestWithExecutionRedux;
  onClick: (item: Item) => void;
  onAbort: (item: Item) => void;
}

const TestCard: FC<TestCardProps> = ({item: {dataItem, latestExecution}, onClick, onAbort}) => {
  const {isClusterAvailable} = useContext(MainContext);

  const ref = useRef(null);
  const isInViewport = useInViewport(ref);

  const {data: metrics} = useGetTestExecutionMetricsQuery(
    {id: dataItem.name, last: 7, limit: 13},
    {skip: !isInViewport || !isClusterAvailable, pollingInterval: PollingIntervals.halfMin}
  );

  return (
    <EntityGridItemPure
      ref={ref}
      item={dataItem}
      latestExecution={latestExecution}
      onClick={onClick}
      onAbort={onAbort}
      metrics={metrics}
      dataTest="tests-list-item"
    />
  );
};

export default TestCard;
