import {Execution} from '@models/execution';

import {usePluginState} from '@plugins/pluginHooks';

import {AiInsightContainer} from './AiInsightsTab.styled';

interface AiInsightsTabProps {
  execution: Execution;
  test: any;
}

const AiInsightsTab = () => {
  const [{execution}] = usePluginState<AiInsightsTabProps>('testExecutionTabs');
  return (
    <AiInsightContainer>
      This is a cloud only feature. Please log in to cloud in order to use this feature for id
      {execution.id}
    </AiInsightContainer>
  );
};

export default AiInsightsTab;
