import React from 'react';
import {Link} from 'react-router-dom';

import {Text} from '@custom-antd';

import Colors from '@styles/Colors';

export enum RunContextType {
  userUI = 'user-ui',
  userCLI = 'user-cli',
  testSuite = 'testsuite',
  testTrigger = 'testtrigger',
  scheduler = 'scheduler',
  default = 'default',
}

type RunContextProps = {
  runContext: {
    type: RunContextType;
    context: string;
  };
};

const RunContext: React.FC<RunContextProps> = props => {
  const {
    runContext: {type = RunContextType.default, context = ''},
  } = props;

  const runContextMap = {
    'user-ui': 'Manual UI',
    'user-cli': 'Manual CLI',
    scheduler: 'Scheduler',
    testsuite: (
      <>
        Test Suite - <Link to={`test-suites/executions/test-suite/execution/${context}`}>{context}</Link>
      </>
    ),
    testtrigger: `Test Trigger - ${context}`,
    default: 'Unknown run context',
  };

  return <Text color={Colors.slate50}>{runContextMap[type]}</Text>;
};

export default RunContext;
