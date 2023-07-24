import {Execution} from '@models/execution';

import {usePluginState} from '@plugins/pluginHooks';

interface AiInsightsTabProps {
  testExecution: Execution;
}

const AiInsightsTab = () => {
  const [{testExecution}] = usePluginState<AiInsightsTabProps>('testExecutionTabs');
  return (
    <div>
      This is a cloud only feature. Please log in to cloud in order to use this feature for id
      {testExecution.id}
    </div>
  );
};

export default AiInsightsTab;
