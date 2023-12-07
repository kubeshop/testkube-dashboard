import {FC, useRef} from 'react';

import {SystemAccess, useSystemAccess} from '@hooks/useSystemAccess';

import {TestSuiteWithExecution} from '@models/testSuite';

import EntityGridItemPure, {Item} from '@molecules/EntityGrid/EntityGridItemPure';

import {useTestSuitesMetricsContext} from './metrics/TestSuitesMetricsContext';

export interface TestSuiteCardProps {
  item: TestSuiteWithExecution;
  onClick: (item: Item) => void;
  onAbort: (item: Item) => void;
}

const TestSuiteCard: FC<TestSuiteCardProps> = ({item: {testSuite, latestExecution}, onClick, onAbort}) => {
  const isAgentAvailable = useSystemAccess(SystemAccess.agent);

  const ref = useRef(null);

  const {testSuitesMetrics} = useTestSuitesMetricsContext();

  return (
    <EntityGridItemPure
      ref={ref}
      item={testSuite}
      latestExecution={latestExecution}
      onClick={onClick}
      onAbort={onAbort}
      metrics={testSuitesMetrics[testSuite.name]}
      dataTest="test-suites-list-item"
      outOfSync={!isAgentAvailable || testSuite.readOnly}
      isAgentAvailable={isAgentAvailable}
      entityLabel="test suite"
    />
  );
};

export default TestSuiteCard;
