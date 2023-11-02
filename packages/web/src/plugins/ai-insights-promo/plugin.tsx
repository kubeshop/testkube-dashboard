import {createPlugin, external} from '@testkube/plugins';

import IconLabel from '@atoms/IconLabel';
import Tag from '@atoms/Tag';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';

import {Execution} from '@models/execution';

import AiInsightsTab from '@plugins/ai-insights-promo/components/AiInsightsTab';
import type GeneralPlugin from '@plugins/general/plugin';
import type TestsPlugin from '@plugins/tests-and-test-suites/plugin';

const generalStub = external<typeof GeneralPlugin>();
const testsStub = external<typeof TestsPlugin>();

export default createPlugin('oss/ai-insights-promo')
  .needs(generalStub.data('useDashboardNavigate'))
  .needs(testsStub.slots('testExecutionTabs', 'testExecutionLogOutputBanners'))
  .needs(testsStub.data('useExecutionDetails', 'useEntityDetails'))

  .init(tk => {
    // Read data from Zustand
    const isTestExecutionFailed = tk.sync(
      () => tk.data.useExecutionDetails(x => x.data as Execution)?.executionResult?.status === 'failed'
    );
    const createAiTabNavigate = tk.sync(() => {
      const entityId = tk.data.useEntityDetails(x => x.id);
      const id = tk.data.useExecutionDetails(x => x.id);
      return useDashboardNavigate(() => `/tests/${entityId}/executions/${id}/ai-insights`);
    });

    // Set up tab
    const tab = {
      key: 'ai-insights',
      label: <IconLabel title="AI Insights" icon={<Tag title="NEW" type="info" />} />,
      children: <AiInsightsTab />,
    };
    tk.slots.testExecutionTabs.add(tab, {order: -110, enabled: isTestExecutionFailed});

    tk.slots.testExecutionLogOutputBanners.add(
      {
        key: 'isAiBannerHidden',
        type: 'default',
        position: 'fullscreen',
        title: '🎉 Get AI support on failing tests! 🎉',
        description: 'Try our AI Hints to improve your tests and get support to debug them more efficiently.',
        buttons: [
          {
            type: 'secondary',
            text: 'Learn more',
            isLink: true,
            linkConfig: {
              href: 'https://testkube.io/get-started',
              target: '_blank',
            },
          },
          {
            type: 'primary',
            text: 'Get AI Hints for this test',
            onClick: () => {
              localStorage.setItem('isAiBannerHidden', 'true');
              createAiTabNavigate()?.();
            },
          },
        ],
      },
      {enabled: isTestExecutionFailed}
    );
  });
