import {FC, ReactNode} from 'react';

import {StoreProvider, createPlugin, data, slot} from '@testkube/plugins';

import {ReactComponent as ExecutorsIcon} from '@assets/executor.svg';
import {ReactComponent as SourcesIcon} from '@assets/sources.svg';
import {ReactComponent as TestSuitesIcon} from '@assets/test-suites-icon.svg';
import {ReactComponent as TestsIcon} from '@assets/tests-icon.svg';
import {ReactComponent as TriggersIcon} from '@assets/triggers.svg';
import {ReactComponent as WebhooksIcon} from '@assets/webhooks.svg';

import {IconProps} from '@atoms/Icon/types';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';

import {Execution} from '@models/execution';

import {CLICommands, ExecutionsVariablesList, LogOutput} from '@molecules';

import TestExecutionArtifacts from '@pages/Tests/TestDetails/TestExecution/TestExecutionArtifacts';

import {useApiEndpoint} from '@services/apiEndpoint';

import {
  initializeClusterDetailsStore,
  useClusterDetails,
  useClusterDetailsField,
  useClusterDetailsPick,
  useClusterDetailsSync,
} from '@store/clusterDetails';
import {
  initializeEntityDetailsStore,
  useEntityDetails,
  useEntityDetailsField,
  useEntityDetailsPick,
  useEntityDetailsSync,
} from '@store/entityDetails';
import {
  initializeExecutionDetailsStore,
  useExecutionDetails,
  useExecutionDetailsField,
  useExecutionDetailsPick,
  useExecutionDetailsSync,
} from '@store/executionDetails';
import {
  initializeExecutorsStore,
  useExecutors,
  useExecutorsField,
  useExecutorsPick,
  useExecutorsSync,
} from '@store/executors';
import {
  initializeLogOutputStore,
  useLogOutput,
  useLogOutputField,
  useLogOutputPick,
  useLogOutputSync,
} from '@store/logOutput';
import {initializeSourcesStore, useSources, useSourcesField, useSourcesPick, useSourcesSync} from '@store/sources';
import {
  initializeTestSuitesStore,
  useTestSuites,
  useTestSuitesField,
  useTestSuitesPick,
  useTestSuitesSync,
} from '@store/testSuites';
import {initializeTestsStore, useTests, useTestsField, useTestsPick, useTestsSync} from '@store/tests';
import {
  initializeTriggersStore,
  useTriggers,
  useTriggersField,
  useTriggersPick,
  useTriggersSync,
} from '@store/triggers';
import {
  initializeWebhooksStore,
  useWebhooks,
  useWebhooksField,
  useWebhooksPick,
  useWebhooksSync,
} from '@store/webhooks';

import {decomposeVariables} from '@utils/variables';

export default createPlugin('web-legacy')
  // General
  .data({useDashboardNavigate})
  .data({useApiEndpoint})
  .define(
    slot<{
      path: string;
      icon: FC<{style: any}>;
      title: string;
      additionalClassName?: string;
      active?: RegExp;
    }>()('siderItems')
  )
  .define(
    slot<{
      icon: IconProps['name'];
      title?: string;
      size?: number;
      onClick?: () => void;
      dropdownComponent?: ReactNode;
    }>()('siderOtherItems')
  )

  // Cluster details
  .provider(tk => <StoreProvider store={initializeClusterDetailsStore} dependencies={[tk.data.useApiEndpoint()]} />)
  .data({useClusterDetails, useClusterDetailsPick, useClusterDetailsField, useClusterDetailsSync})

  // Tests & Test Suites
  .define(data<(tab: string) => void>()('setExecutionTab'))
  .define(slot<{key: string; label: ReactNode; children: ReactNode}>()('testExecutionTabs'))
  .define(slot<ReactNode>()('testExecutionLogOutputBanner'))
  .define(slot<ReactNode>()('deleteTestExtension'))
  .define(slot<ReactNode>()('deleteTestSuiteExtension'))
  .define(slot<ReactNode>()('testSuitesListTitleAddon'))
  .provider(tk => <StoreProvider store={initializeTestsStore} dependencies={[tk.data.useApiEndpoint()]} />)
  .data({useTests, useTestsPick, useTestsField, useTestsSync})
  .provider(tk => <StoreProvider store={initializeTestSuitesStore} dependencies={[tk.data.useApiEndpoint()]} />)
  .data({useTestSuites, useTestSuitesPick, useTestSuitesField, useTestSuitesSync})
  .provider(tk => <StoreProvider store={initializeEntityDetailsStore} dependencies={[tk.data.useApiEndpoint()]} />)
  .data({useEntityDetails, useEntityDetailsPick, useEntityDetailsField, useEntityDetailsSync})
  .provider(tk => <StoreProvider store={initializeExecutionDetailsStore} dependencies={[tk.data.useApiEndpoint()]} />)
  .data({useExecutionDetails, useExecutionDetailsPick, useExecutionDetailsField, useExecutionDetailsSync})
  .provider(tk => (
    <StoreProvider
      store={initializeLogOutputStore}
      dependencies={[tk.data.useApiEndpoint(), window.location.pathname]}
    />
  ))
  .data({useLogOutput, useLogOutputPick, useLogOutputField, useLogOutputSync})

  // Executors
  .provider(tk => <StoreProvider store={initializeExecutorsStore} dependencies={[tk.data.useApiEndpoint()]} />)
  .data({useExecutors, useExecutorsPick, useExecutorsField, useExecutorsSync})

  // Test Sources
  .provider(tk => <StoreProvider store={initializeSourcesStore} dependencies={[tk.data.useApiEndpoint()]} />)
  .data({useSources, useSourcesPick, useSourcesField, useSourcesSync})

  // Triggers
  .provider(tk => <StoreProvider store={initializeTriggersStore} dependencies={[tk.data.useApiEndpoint()]} />)
  .data({useTriggers, useTriggersPick, useTriggersField, useTriggersSync})

  // Webhooks
  .provider(tk => <StoreProvider store={initializeWebhooksStore} dependencies={[tk.data.useApiEndpoint()]} />)
  .data({useWebhooks, useWebhooksPick, useWebhooksField, useWebhooksSync})

  // Settings

  // Finish
  .init(tk => {
    // TODO: Instead of using tk.sync, use all the necessities directly in the plugin components
    tk.data.setExecutionTab = tk.sync(() => {
      const entityId = tk.data.useEntityDetails(x => x.id);
      const id = tk.data.useExecutionDetails(x => x.id);
      return useDashboardNavigate((next: string) => `/tests/${entityId}/executions/${id}/${next}`);
    });

    // TODO: Each of these should be injected from separate plugin
    const siderItems = [
      {path: '/tests', icon: TestsIcon, title: 'Tests'},
      {path: '/test-suites', icon: TestSuitesIcon, title: 'Test Suites'},
      {path: '/executors', icon: ExecutorsIcon, title: 'Executors'},
      {path: '/triggers', icon: TriggersIcon, title: 'Triggers'},
      {path: '/webhooks', icon: WebhooksIcon, title: 'Webhooks'},
      {path: '/sources', icon: SourcesIcon, title: 'Sources'},
    ];

    siderItems.forEach((item, index) => tk.slots.siderItems.add(item, {order: index * 2}));

    // TODO: Consider wrapping the components to read data directly there and avoid tk.sync
    // TODO: Inject these from separate plugins
    // TODO: Consider allowing hooks in `enabled` (?)
    tk.slots.testExecutionTabs.add(
      {
        key: 'log-output',
        label: 'Log Output',
        children: tk.render(() => {
          const execution = tk.data.useExecutionDetails(x => x.data as Execution);
          const {
            id,
            executionResult: {status, output, errorMessage},
          } = execution;
          const logBanner = tk.slots.testExecutionLogOutputBanner.first();
          return (
            <LogOutput
              logOutput={output || errorMessage}
              executionId={id}
              isRunning={status === 'running'}
              banner={logBanner}
            />
          );
        }),
      },
      {order: -Infinity}
    );
    const isReadOnlyEntity = tk.sync(() => {
      const {details} = tk.data.useEntityDetailsPick('details');
      return details?.readOnly;
    });
    const mayHaveArtifacts = tk.sync(() => {
      const {testType} = tk.data.useExecutionDetails(x => x.data as Execution) || {};
      const {featuresMap} = tk.data.useExecutorsPick('featuresMap');
      const {details} = tk.data.useEntityDetailsPick('details');
      return featuresMap[testType]?.includes('artifacts') || details?.readOnly;
    });
    tk.slots.testExecutionTabs.add(
      {
        key: 'artifacts',
        label: 'Artifacts',
        children: tk.render(() => {
          const execution = tk.data.useExecutionDetails(x => x.data as Execution);
          const {id, testName, testSuiteName, startTime} = execution || {};
          return (
            <TestExecutionArtifacts
              id={id}
              testName={testName}
              testSuiteName={testSuiteName}
              startTime={startTime.toString()}
            />
          );
        }),
      },
      {order: 0, enabled: mayHaveArtifacts}
    );
    tk.slots.testExecutionTabs.add(
      {
        key: 'cli-commands',
        label: 'CLI Commands',
        children: tk.render(() => {
          const execution = tk.data.useExecutionDetails(x => x.data as Execution);
          const {
            id,
            testType,
            executionResult: {status},
          } = execution || {};
          return <CLICommands isExecutions type={testType} id={id} modifyMap={{status}} />;
        }),
      },
      {order: 2, enabled: () => !isReadOnlyEntity()}
    );
    const getDecomposedVars = tk.sync(() => {
      const {variables} = tk.data.useExecutionDetails(x => x.data as Execution) || {};
      return decomposeVariables(variables || {});
    });
    tk.slots.testExecutionTabs.add(
      {
        key: 'variables',
        label: 'Variables',
        children: tk.render(() => {
          return <ExecutionsVariablesList variables={getDecomposedVars()!} />;
        }),
      },
      {order: 4, enabled: () => Boolean(getDecomposedVars()?.length)}
    );
  });
