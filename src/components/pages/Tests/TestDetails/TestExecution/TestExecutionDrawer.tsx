import {FC} from 'react';

import {ExecutionDrawer, ExecutionDrawerHeader} from '@organisms';

import {useExecutionDetailsPick} from '@store/executionDetails';

import TestExecutionTabs from './TestExecutionTabs';

const TestExecutionDrawer: FC = () => {
  const {close, id, data} = useExecutionDetailsPick('close', 'id', 'data');
  return (
    <ExecutionDrawer header={<ExecutionDrawerHeader />} loading={!data} open={Boolean(id)} onClose={close}>
      <TestExecutionTabs />
    </ExecutionDrawer>
  );
};

export default TestExecutionDrawer;
