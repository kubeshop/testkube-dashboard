import {IconLabel, Tag} from '@atoms';

import {config} from '@constants/config';

import {AiInsightsTab, MessagePanel} from '@molecules';

import {AiBannerInterface, Plugin, TestExecutionTabsInterface} from '@plugins/types';

import PluginScope from '../PluginScope';

const isTestExecutionFailed = (scope: PluginScope) => {
  return (
    scope.getState<TestExecutionTabsInterface>('testExecutionTabs')?.execution?.executionResult?.status === 'failed'
  );
};

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
          return isTestExecutionFailed(scope);
        },
      }
    );
    scope.appendSlot(
      'executionDrawerBanner',
      <MessagePanel
        buttons={[
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
              scope.getState<AiBannerInterface>('aiExecutionBanner')?.onAccept();
            },
          },
        ]}
        onClose={() => {
          scope.getState<AiBannerInterface>('aiExecutionBanner')?.onClose();
        }}
        isClosable
        type="default"
        title="🎉 Get AI support on failing tests! 🎉"
        description="Try our AI Hints to improve your tests and get support to debug them more efficiently."
      />,
      {
        visible: () => localStorage.getItem(config.isAiBannerHidden) !== 'true' && isTestExecutionFailed(scope),
      }
    );
  },
});

export default createAiInsightsPlugin;
