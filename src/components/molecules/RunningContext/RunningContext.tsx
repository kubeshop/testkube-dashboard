import React from 'react';
import {Link} from 'react-router-dom';

import {Text} from '@custom-antd';

import Colors from '@styles/Colors';

export enum RunningContextType {
  userUI = 'user-ui',
  userCLI = 'user-cli',
  testSuite = 'testsuite',
  testTrigger = 'testtrigger',
  scheduler = 'scheduler',
  default = 'default',
}

type RunningContextProps = {
  type?: RunningContextType;
  context?: string;
};

const RunningContext: React.FC<RunningContextProps> = props => {
  const {type = RunningContextType.default, context = ''} = props;

  const runContextMap = {
    'user-ui': 'Manual UI',
    'user-cli': 'Manual CLI',
    scheduler: 'Scheduler',
    testsuite: context ? (
      <Link to={`/test-suites/executions/test-suite/execution/${context}`}>{context}</Link>
    ) : (
      'Test Suite'
    ),
    testtrigger: context || 'Test Trigger',
    default: 'Unknown run context',
  };

  return <Text color={Colors.slate50}>{runContextMap[type]}</Text>;
};

export default RunningContext;
