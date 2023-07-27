import {Execution} from '@models/execution';

import {usePluginState} from '@plugins/pluginHooks';

interface AiInsightsTabProps {
  execution: Execution;
  test: any;
}

const AiInsightsTab = () => {
  const [{execution}] = usePluginState<AiInsightsTabProps>('testExecutionTabs');
  return (
    <div>
      This is a cloud only feature. Please log in to cloud in order to use this feature for id
      {execution.id}
    </div>
  );
};

export default AiInsightsTab;
