import {FC} from 'react';

import {TestSuiteExecutionDetailsTabs} from '@molecules';

import ExecutionDrawer from 'src/components/organisms/EntityDetails/ExecutionDrawer';
import ExecutionDrawerHeader from '@organisms/EntityDetails/ExecutionDrawer/ExecutionDrawerHeader';

import {useExecutionDetailsPick} from '@store/executionDetails';

const TestSuiteExecutionDrawer: FC = () => {
  const {close, id, data} = useExecutionDetailsPick('close', 'id', 'data');
  return (
    <ExecutionDrawer
      header={<ExecutionDrawerHeader />}
      loading={!data}
      open={Boolean(id)}
      onClose={close}
    >
      <TestSuiteExecutionDetailsTabs />
    </ExecutionDrawer>
  );
};

export default TestSuiteExecutionDrawer;
