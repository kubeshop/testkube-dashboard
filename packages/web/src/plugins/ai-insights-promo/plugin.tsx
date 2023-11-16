import {createPlugin, external} from '@testkube/plugins';

import IconLabel from '@atoms/IconLabel';
import Tag from '@atoms/Tag';

import {Execution} from '@models/execution';

import AiInsightsTab from '@plugins/ai-insights-promo/components/AiInsightsTab';
import type TestsPlugin from '@plugins/tests-and-test-suites/plugin';

const testsStub = external<typeof TestsPlugin>();

export default createPlugin('oss/ai-insights-promo')
  .needs(testsStub.slots('testExecutionTabs'))
  .needs(testsStub.data('useExecutionDetails', 'useEntityDetails'))

  .init(tk => {
    // Read data from Zustand
    const isTestExecutionFailed = tk.sync(
      () => tk.data.useExecutionDetails(x => x.data as Execution)?.executionResult?.status === 'failed'
    );

    // Set up tab
    const tab = {
      key: 'ai-insights',
      label: <IconLabel title="AI Insights" icon={<Tag title="NEW" type="info" />} />,
      children: <AiInsightsTab />,
    };
    tk.slots.testExecutionTabs.add(tab, {order: -110, enabled: isTestExecutionFailed});
  });
