import {FC} from 'react';

import {TestSuiteExecutionDetailsTabs} from '@molecules';

import ExecutionDetailsDrawer from '@organisms/EntityDetails/ExecutionDetailsDrawer';
import ExecutionDetailsDrawerHeader from '@organisms/EntityDetails/ExecutionDetailsDrawer/ExecutionDetailsDrawerHeader';

import {useExecutionDetailsPick} from '@store/executionDetails';

const TestSuiteExecutionDetailsDrawer: FC = () => {
  const {close, id, data} = useExecutionDetailsPick('close', 'id', 'data');
  return (
    <ExecutionDetailsDrawer
      header={<ExecutionDetailsDrawerHeader data={data} />}
      loading={!data}
      open={Boolean(id)}
      onClose={close}
    >
      <TestSuiteExecutionDetailsTabs />
    </ExecutionDetailsDrawer>
  );
};

export default TestSuiteExecutionDetailsDrawer;
