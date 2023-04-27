import {useContext} from 'react';

import {Tabs} from 'antd';

import {Tab} from 'rc-tabs/lib/interface';

import {TestSuiteExecution} from '@models/testSuiteExecution';

import {ExecutionStepsList} from '@molecules';

import {ExecutionDetailsContext} from '@contexts';

const TestSuiteExecutionDetailsTabs: React.FC = () => {
  const {data} = useContext(ExecutionDetailsContext);

  const testSuiteData = data as TestSuiteExecution;
  const {stepResults} = testSuiteData;

  const items = [
    stepResults && stepResults.length
      ? {
          key: 'AllStepsPane',
          label: 'All Steps',
          children: <ExecutionStepsList executionSteps={stepResults} />,
        }
      : null,
  ].filter(Boolean) as Tab[];

  return <Tabs items={items} />;
};

export default TestSuiteExecutionDetailsTabs;
