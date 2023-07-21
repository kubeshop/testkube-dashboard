import {usePluginState} from '@plugins/pluginHooks';

const AiInsightsTab = () => {
  const [aiInsightsProps] = usePluginState<{id: string}>('executionDetailsTabs');
  return <div>This is a cloud only feature. Please log in to cloud in order to use this feature</div>;
};

export default AiInsightsTab;
