import {FC} from 'react';

import {TestExecutionDetailsTabs} from '@molecules';

import ExecutionDetailsDrawer from '@organisms/EntityDetails/ExecutionDetailsDrawer';
import ExecutionDetailsDrawerHeader from '@organisms/EntityDetails/ExecutionDetailsDrawer/ExecutionDetailsDrawerHeader';

import {useExecutionDetailsPick} from '@store/executionDetails';

const TestExecutionDetailsDrawer: FC = () => {
  const {close, id, data} = useExecutionDetailsPick('close', 'id', 'data');
  return (
    <ExecutionDetailsDrawer
      header={<ExecutionDetailsDrawerHeader />}
      loading={!data}
      open={Boolean(id)}
      onClose={close}
    >
      <TestExecutionDetailsTabs />
    </ExecutionDetailsDrawer>
  );
};

export default TestExecutionDetailsDrawer;
