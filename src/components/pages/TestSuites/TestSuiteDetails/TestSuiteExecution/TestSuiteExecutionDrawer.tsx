import {FC} from 'react';

import ExecutionDrawer from '@organisms/EntityDetails/ExecutionDrawer';
import ExecutionDrawerHeader from '@organisms/EntityDetails/ExecutionDrawer/ExecutionDrawerHeader';

import {useExecutionDetailsPick} from '@store/executionDetails';

import TestSuiteExecutionTabs from './TestSuiteExecutionTabs';

const TestSuiteExecutionDrawer: FC = () => {
  const {close, id, data} = useExecutionDetailsPick('close', 'id', 'data');
  return (
    <ExecutionDrawer header={<ExecutionDrawerHeader />} loading={!data} open={Boolean(id)} onClose={close}>
      <TestSuiteExecutionTabs />
    </ExecutionDrawer>
  );
};

export default TestSuiteExecutionDrawer;
