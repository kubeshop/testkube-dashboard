import {Tabs} from 'antd';

import {TestSuiteExecution} from '@models/testSuiteExecution';

import {ExecutionStepsList} from '@molecules';

import {useExecutionDetailsPick} from '@store/executionDetails';

const TestSuiteExecutionTabs: React.FC = () => {
  const {
    data: {executeStepResults},
  } = useExecutionDetailsPick('data') as {data: TestSuiteExecution};

  return (
    <Tabs
      items={[
        {
          key: 'steps',
          label: 'All Steps',
          children: <ExecutionStepsList executionSteps={executeStepResults} />,
        },
      ]}
    />
  );
};

export default TestSuiteExecutionTabs;
