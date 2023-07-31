import {useMemo} from 'react';

import {Tabs} from 'antd';

import {TestSuiteExecution} from '@models/testSuiteExecution';

import {ExecutionStepsList} from '@molecules';

import {useExecutionDetailsPick} from '@store/executionDetails';

import {convertTestSuiteV2ExecutionToV3, isTestSuiteV2Execution} from '@utils/testSuites';

const TestSuiteExecutionDetailsTabs: React.FC = () => {
  const {data} = useExecutionDetailsPick('data') as {data: TestSuiteExecution};

  const testSuiteData = useMemo(
    () => (isTestSuiteV2Execution(data) ? convertTestSuiteV2ExecutionToV3(data) : data),
    [data]
  );
  const {executeStepResults} = testSuiteData;

  return (
    <Tabs
      items={[
        {
          key: 'AllStepsPane',
          label: 'All Steps',
          children: <ExecutionStepsList executionSteps={executeStepResults} />,
        },
      ]}
    />
  );
};

export default TestSuiteExecutionDetailsTabs;
