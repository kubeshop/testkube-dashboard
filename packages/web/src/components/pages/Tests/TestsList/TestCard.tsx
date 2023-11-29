import {FC, useRef} from 'react';

import {SystemAccess, useSystemAccess} from '@hooks/useSystemAccess';

import {TestWithExecution} from '@models/test';

import EntityGridItemPure, {Item} from '@molecules/EntityGrid/EntityGridItemPure';

import {useTestsMetricsContext} from './metrics/TestsMetricsContext';

export interface TestCardProps {
  item: TestWithExecution;
  onClick: (item: Item) => void;
  onAbort: (item: Item) => void;
}

const TestCard: FC<TestCardProps> = ({item: {test, latestExecution}, onClick, onAbort}) => {
  const isAgentAvailable = useSystemAccess(SystemAccess.agent);

  const ref = useRef(null);

  const {metrics} = useTestsMetricsContext();

  return (
    <EntityGridItemPure
      ref={ref}
      item={test}
      latestExecution={latestExecution}
      onClick={onClick}
      onAbort={onAbort}
      metrics={metrics[test.name]}
      dataTest="tests-list-item"
      outOfSync={!isAgentAvailable || test.readOnly}
      isAgentAvailable={isAgentAvailable}
      entityLabel="test"
    />
  );
};

export default TestCard;
