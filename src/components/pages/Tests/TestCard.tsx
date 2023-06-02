import React, {useContext, useMemo, useRef} from 'react';

import {MainContext} from '@contexts';

import useInViewport from '@hooks/useInViewport';

import {TestWithExecution} from '@models/test';

import EntityGridItemPure from '@molecules/EntityGrid/EntityGridItemPure';

import {useGetTestExecutionMetricsQuery} from '@services/tests';

import {PollingIntervals} from '@utils/numbers';

interface TestCardProps {
  item: TestWithExecution;
  buildUrl: (item: TestWithExecution['test']) => string;
}

const TestCard: React.FC<TestCardProps> = props => {
  const {item, buildUrl} = props;
  const {test} = item;

  const {isClusterAvailable} = useContext(MainContext);

  const ref = useRef(null);
  const isInViewport = useInViewport(ref);

  const {data: metrics} = useGetTestExecutionMetricsQuery(
    {id: test.name, last: 7, limit: 13},
    {skip: !isInViewport || !isClusterAvailable, pollingInterval: PollingIntervals.halfMin}
  );

  return (
    <EntityGridItemPure
      entity="tests"
      ref={ref}
      item={item.test}
      latestExecution={item.latestExecution}
      href={buildUrl(item.test)}
      metrics={metrics}
    />
  );
};

export default TestCard;
