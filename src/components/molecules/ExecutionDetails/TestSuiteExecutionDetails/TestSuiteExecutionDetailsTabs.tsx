import {useContext} from 'react';

import {Tabs} from 'antd';

import {TestSuiteExecution} from '@models/testSuiteExecution';

import {ExecutionStepsList} from '@molecules';

import {ExecutionDetailsContext} from '@contexts';

const TestSuiteExecutionDetailsTabs: React.FC = () => {
  const {data} = useContext(ExecutionDetailsContext);

  const testSuiteData = data as TestSuiteExecution;
  const {stepResults} = testSuiteData;

  return (
    <Tabs
      items={[
        {
          key: 'AllStepsPane',
          label: 'All Steps',
          children: <ExecutionStepsList executionSteps={stepResults} />,
        },
      ]}
    />
  );
};

export default TestSuiteExecutionDetailsTabs;
