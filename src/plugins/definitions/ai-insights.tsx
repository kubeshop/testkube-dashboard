import {IconLabel, Tag} from '@atoms';

import {AiInsightsTab} from '@molecules';

import {Plugin, TestExecutionTabsInterface} from '@plugins/types';

const createAiInsightsPlugin = (): Plugin => ({
  name: 'ai-insights',
  setup: scope => {
    scope.appendSlot(
      'testExecutionTabs',
      {
        key: 'ai-insights',
        label: <IconLabel title="AI Insights" icon={<Tag title="NEW" type="info" />} />,
        children: <AiInsightsTab />,
      },
      {
        order: 4,
        visible: () => {
          return (
            scope.getState<TestExecutionTabsInterface>('testExecutionTabs')?.execution?.executionResult?.status ===
            'failed'
          );
        },
      }
    );
  },
});

export default createAiInsightsPlugin;
