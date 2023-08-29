import {FC, memo} from 'react';

import {Text} from '@custom-antd';

import {Entity} from '@models/entity';

import Colors from '@styles/Colors';

import {hasProtocol} from '@utils/strings';

import ContextDisplay, {ContextDisplayProps} from './ContextDisplay';

export enum RunningContextType {
  userUI = 'user-ui',
  userCLI = 'user-cli',
  testSuite = 'testsuite',
  testTrigger = 'testtrigger',
  testExecution = 'testexecution',
  testSuiteExecution = 'testsuiteexecution',
  scheduler = 'scheduler',
  githubAction = 'githubaction',
}

type RunningContextProps = {
  id: string;
  type?: RunningContextType;
  context?: string;
  entity: Entity;
};

const labels: Partial<Record<RunningContextType, string>> = {
  [RunningContextType.userUI]: 'Manual UI',
  [RunningContextType.githubAction]: 'GitHub Action',
  [RunningContextType.testSuiteExecution]: 'Test Suite Execution',
  [RunningContextType.testExecution]: 'Test Execution',
};

const RunningContext: FC<RunningContextProps> = props => {
  const {id, type, context = '', entity} = props;
  const url = hasProtocol(context) ? context : undefined;

  const runContextMap: Partial<Record<RunningContextType, ContextDisplayProps>> = {
    [RunningContextType.userCLI]: {label: 'Manual CLI', text: url ? 'Context' : context, url, wrap: true},
    [RunningContextType.scheduler]: {label: 'Scheduler', text: context, url: `/${entity}/${id}/settings/scheduling`},
    [RunningContextType.testSuite]: {
      text: context || 'Test Suite',
      url: `/test-suites/${context.replace(/^ts-/, '').replace(/-[0-9]+$/, '')}`,
    },
    [RunningContextType.testTrigger]: {
      text: context || 'Test Trigger',
      url: context ? `/triggers/${context}` : undefined,
    },
    [RunningContextType.githubAction]: {text: 'GitHub Action', url},
  };

  const displayProps = runContextMap[type!] || {
    url,
    tooltip: url ? undefined : context,
    text: labels[type!] || type || 'Unknown',
  };

  return (
    <Text color={Colors.slate50}>
      <ContextDisplay {...displayProps} />
    </Text>
  );
};

export default memo(RunningContext);
