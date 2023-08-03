import {IconLabel, Tag} from '@atoms';

import {AiInsightsTab} from '@molecules';

import {Plugin} from '../types';

const getAiInsightsPlugin = (): Plugin => ({
  name: 'ai-insights',
  setup: scope => {
    scope.appendSlot(
      'testExecutionTabs',
      {
        key: 'ai-insights-tab',
        label: <IconLabel title="AI Insights" icon={<Tag title="NEW" type="info" />} />,
        children: <AiInsightsTab />,
      },
      {
        order: 4,
      }
    );
  },
});

export default getAiInsightsPlugin;
