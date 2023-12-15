import {FC, useRef} from 'react';

import useInViewport from '@hooks/useInViewport';
import {SystemAccess, useSystemAccess} from '@hooks/useSystemAccess';

import {TestSuiteWithExecution} from '@models/testSuite';

import EntityGridItemPure, {Item} from '@molecules/EntityGrid/EntityGridItemPure';
import TestSuiteActionsDropdown from '@molecules/TestSuiteActionsDropdown';

import {useGetTestSuiteExecutionMetricsQuery} from '@services/testSuites';

import {PollingIntervals} from '@utils/numbers';

export interface TestSuiteCardProps {
  item: TestSuiteWithExecution;
  onClick: (item: Item) => void;
}

const TestSuiteCard: FC<TestSuiteCardProps> = ({item: {testSuite, latestExecution}, onClick}) => {
  const isAgentAvailable = useSystemAccess(SystemAccess.agent);
  const isSystemAvailable = useSystemAccess(SystemAccess.system);

  const ref = useRef(null);
  const isInViewport = useInViewport(ref);

  const {data: metrics} = useGetTestSuiteExecutionMetricsQuery(
    {id: testSuite.name, last: 7, limit: 13},
    {skip: !isInViewport || !isSystemAvailable, pollingInterval: PollingIntervals.halfMin}
  );

  return (
    <EntityGridItemPure
      ref={ref}
      item={testSuite}
      latestExecution={latestExecution}
      onClick={onClick}
      metrics={metrics}
      dataTest="test-suites-list-item"
      outOfSync={!isAgentAvailable || testSuite.readOnly}
      isAgentAvailable={isAgentAvailable}
      entityLabel="test suite"
      DropdownComponent={TestSuiteActionsDropdown}
    />
  );
};

export default TestSuiteCard;
