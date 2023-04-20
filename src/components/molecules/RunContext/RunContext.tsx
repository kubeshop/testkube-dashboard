import React from 'react';
import {Link} from 'react-router-dom';

import {Text} from '@custom-antd';

type RunContextProps = {
  runContext?: {
    type: 'scheduler' | 'testsuite' | 'cliManual' | 'testtrigger';
    context: string;
  };
};

const RunContext: React.FC<RunContextProps> = ({runContext}) => {
  const runContextMap = {
    scheduler: {
      text: `Scheduled to run on a schedule: ${runContext?.context || ''}`,
      link: null,
    },
    testsuite: {
      text: `Triggered by test suite ${runContext?.context || ''}.`,
      link: <Link to={`/test-suites/${runContext?.context}`}>Link to test suite</Link>,
    },
    cliManual: {
      text: 'Manually triggered by a command line interface.',
      link: null,
    },
    testtrigger: {
      text: `Triggered by test ${runContext?.context || ''}.`,
      link: <Link to={`/tests/${runContext?.context}`}>Link to test</Link>,
    },
    default: {
      text: 'Unknown run context.',
      link: null,
    },
  };

  const {type = 'default', context} = runContext || {};
  const {text, link} = runContextMap[type];

  return (
    <Text>
      {text} {link}
    </Text>
  );
};

export default RunContext;
