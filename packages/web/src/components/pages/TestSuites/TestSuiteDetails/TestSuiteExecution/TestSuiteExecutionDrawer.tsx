import {FC} from 'react';

import ExecutionDrawer from '@organisms/ExecutionDrawer';
import ExecutionDrawerHeader from '@organisms/ExecutionDrawer/ExecutionDrawerHeader';

import {useAbortTestExecutionMutation} from '@services/tests';

import {useExecutionDetailsPick} from '@store/executionDetails';

import TestSuiteExecutionTabs from './TestSuiteExecutionTabs';

const TestSuiteExecutionDrawer: FC = () => {
  const {close, id, data} = useExecutionDetailsPick('close', 'id', 'data');
  return (
    <ExecutionDrawer
      header={<ExecutionDrawerHeader useAbortExecution={useAbortTestExecutionMutation} />}
      loading={!data}
      open={Boolean(id)}
      onClose={close}
    >
      <TestSuiteExecutionTabs />
    </ExecutionDrawer>
  );
};

export default TestSuiteExecutionDrawer;
