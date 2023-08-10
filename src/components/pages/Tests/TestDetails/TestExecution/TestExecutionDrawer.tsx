import {FC} from 'react';

import {ExecutionDrawer, ExecutionDrawerHeader} from '@organisms';

import {usePluginSlot} from '@plugins/pluginHooks';

import {useAbortTestExecutionMutation} from '@services/tests';

import {useExecutionDetailsPick} from '@store/executionDetails';

import TestExecutionTabs from './TestExecutionTabs';

const TestExecutionDrawer: FC = () => {
  const {close, id, data} = useExecutionDetailsPick('close', 'id', 'data');
  // TODO: Rename to testExecutionDrawerBanner?
  const drawerBanner = usePluginSlot('executionDrawerBanner');
  return (
    <ExecutionDrawer
      header={<ExecutionDrawerHeader useAbortExecution={useAbortTestExecutionMutation} />}
      loading={!data}
      open={Boolean(id)}
      onClose={close}
      bannerVisible={Boolean(drawerBanner)}
    >
      <TestExecutionTabs />
    </ExecutionDrawer>
  );
};

export default TestExecutionDrawer;
