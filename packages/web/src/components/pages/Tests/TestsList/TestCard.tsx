import {FC, useRef} from 'react';

import useInViewport from '@hooks/useInViewport';
import {SystemAccess, useSystemAccess} from '@hooks/useSystemAccess';

import {TestWithExecution} from '@models/test';

import EntityGridItemPure, {Item} from '@molecules/EntityGrid/EntityGridItemPure';
import TestActionsDropdown from '@molecules/TestActionsDropdown';

import {useGetTestExecutionMetricsQuery} from '@services/tests';

import {PollingIntervals} from '@utils/numbers';

export interface TestCardProps {
  item: TestWithExecution;
  onClick: (item: Item) => void;
}

const TestCard: FC<TestCardProps> = ({item: {test, latestExecution}, onClick}) => {
  const isAgentAvailable = useSystemAccess(SystemAccess.agent);
  const isSystemAvailable = useSystemAccess(SystemAccess.system);

  const ref = useRef(null);
  const isInViewport = useInViewport(ref);

  const {data: metrics} = useGetTestExecutionMetricsQuery(
    {id: test.name, last: 7, limit: 13},
    {skip: !isInViewport || !isSystemAvailable, pollingInterval: PollingIntervals.halfMin}
  );

  return (
    <EntityGridItemPure
      ref={ref}
      item={test}
      latestExecution={latestExecution}
      onClick={onClick}
      metrics={metrics}
      dataTest="tests-list-item"
      outOfSync={!isAgentAvailable || test.readOnly}
      isAgentAvailable={isAgentAvailable}
      entityLabel="test"
      DropdownComponent={TestActionsDropdown}
    />
  );
};

export default TestCard;
