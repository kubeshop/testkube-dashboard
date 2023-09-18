import React, {FC, useRef} from 'react';

import useInViewport from '@hooks/useInViewport';
import {SystemAccess, useSystemAccess} from '@hooks/useSystemAccess';

import {TestSuiteWithExecution} from '@models/testSuite';

import EntityGridItemPure, {Item} from '@molecules/EntityGrid/EntityGridItemPure';

import {useGetTestSuiteExecutionMetricsQuery} from '@services/testSuites';

import {PollingIntervals} from '@utils/numbers';

export interface TestSuiteCardProps {
  item: TestSuiteWithExecution;
  onClick: (item: Item) => void;
  onAbort: (item: Item) => void;
}

const TestSuiteCard: FC<TestSuiteCardProps> = ({item: {testSuite, latestExecution}, onClick, onAbort}) => {
  const isClusterAvailable = useSystemAccess(SystemAccess.agent);

  const ref = useRef(null);
  const isInViewport = useInViewport(ref);

  const {data: metrics} = useGetTestSuiteExecutionMetricsQuery(
    {id: testSuite.name, last: 7, limit: 13},
    {skip: !isInViewport || !isClusterAvailable, pollingInterval: PollingIntervals.halfMin}
  );

  return (
    <EntityGridItemPure
      ref={ref}
      item={testSuite}
      latestExecution={latestExecution}
      onClick={onClick}
      onAbort={onAbort}
      metrics={metrics}
      dataTest="test-suites-list-item"
    />
  );
};

export default TestSuiteCard;
