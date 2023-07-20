import {usePluginState} from '@plugins/pluginHooks';

const AiInsightsTab = () => {
  const [aiInsightsProps] = usePluginState<{id: string}>('executionDetailsTabs');
  return <div>AI tab for execution: {aiInsightsProps.id}</div>;
};

export default AiInsightsTab;
