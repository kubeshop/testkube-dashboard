import React, {FC, useContext, useRef} from 'react';

import {MainContext} from '@contexts';

import useInViewport from '@hooks/useInViewport';

import {TestSuiteWithExecutionRedux} from '@models/testSuite';

import EntityGridItemPure, {Item} from '@molecules/EntityGrid/EntityGridItemPure';

import {useGetTestSuiteExecutionMetricsQuery} from '@services/testSuiteExecutions';

import {PollingIntervals} from '@utils/numbers';

export interface TestSuiteCardProps {
  item: TestSuiteWithExecutionRedux;
  onClick: (item: Item) => void;
  onAbort: (item: Item) => void;
}

const TestSuiteCard: FC<TestSuiteCardProps> = ({item: {dataItem, latestExecution}, onClick, onAbort}) => {
  const {isClusterAvailable} = useContext(MainContext);

  const ref = useRef(null);
  const isInViewport = useInViewport(ref);

  const {data: metrics} = useGetTestSuiteExecutionMetricsQuery(
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
      dataTest="test-suites-list-item"
    />
  );
};

export default TestSuiteCard;
