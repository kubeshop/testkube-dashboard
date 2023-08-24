import {FC} from 'react';

import {Tabs} from 'antd';

import type {TestSuiteExecution} from '@models/testSuiteExecution';

import {ExecutionStepsList} from '@molecules/ExecutionStepsList';

import {useExecutionDetailsPick} from '@store/executionDetails';

export const TestSuiteExecutionTabs: FC = () => {
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
