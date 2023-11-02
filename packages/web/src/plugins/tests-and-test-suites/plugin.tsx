import {ReactNode} from 'react';

import {StoreProvider, createPlugin, data, external, slot} from '@testkube/plugins';

import {ReactComponent as TestSuitesIcon} from '@assets/test-suites-icon.svg';
import {ReactComponent as TestsIcon} from '@assets/tests-icon.svg';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';

import {Execution} from '@models/execution';

import {CLICommands, ExecutionsVariablesList, LogOutput} from '@molecules';
import {MessagePanelProps} from '@molecules/MessagePanel/MessagePanel';

import TestSuiteDetails from '@pages/TestSuites/TestSuiteDetails';
import TestSuitesList from '@pages/TestSuites/TestSuitesList';
import TestDetails from '@pages/Tests/TestDetails';
import TestExecutionArtifacts from '@pages/Tests/TestDetails/TestExecution/TestExecutionArtifacts';
import TestsList from '@pages/Tests/TestsList';

import type ExecutorsPlugin from '@plugins/executors/plugin';
import type GeneralPlugin from '@plugins/general/plugin';
import type RtkPlugin from '@plugins/rtk/plugin';

import {testSuitesApi} from '@services/testSuites';
import {testsApi} from '@services/tests';

import DashboardRewrite from '@src/DashboardRewrite';

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
  initializeLogOutputStore,
  useLogOutput,
  useLogOutputField,
  useLogOutputPick,
  useLogOutputSync,
} from '@store/logOutput';
import {
  initializeTestSuitesStore,
  useTestSuites,
  useTestSuitesField,
  useTestSuitesPick,
  useTestSuitesSync,
} from '@store/testSuites';
import {initializeTestsStore, useTests, useTestsField, useTestsPick, useTestsSync} from '@store/tests';

import {decomposeVariables} from '@utils/variables';

const generalStub = external<typeof GeneralPlugin>();
const executorsStub = external<typeof ExecutorsPlugin>();
const rtkStub = external<typeof RtkPlugin>();

// TODO: Split
export default createPlugin('oss/tests-and-test-suites')
  .needs(generalStub.slots('siderItems'))
  .needs(generalStub.data('useApiEndpoint'))
  .needs(executorsStub.data('useExecutors'))
  .needs(rtkStub.slots('rtkServices'))

  // Backwards compatibility
  .route('/tests/executions/:id', <DashboardRewrite pattern="/tests/:id" keepQuery />)
  .route(
    '/tests/executions/:id/execution/:execId',
    <DashboardRewrite pattern="/tests/:id/executions/:execId" keepQuery />
  )
  .route('/test-suites/executions/:id', <DashboardRewrite pattern="/test-suites/:id" keepQuery />)
  .route(
    '/test-suites/executions/:id/execution/:execId',
    <DashboardRewrite pattern="/test-suites/:id/executions/:execId" keepQuery />
  )

  .route('/tests', <TestsList />)
  .route('/tests/:id', <TestDetails tab="executions" />)
  .route('/tests/:id/executions', <TestDetails tab="executions" />)
  .route('/tests/:id/executions/:execId', <TestDetails tab="executions" />)
  .route('/tests/:id/executions/:execId/:execDetailsTab', <TestDetails tab="executions" />)
  .route('/tests/:id/commands', <TestDetails tab="commands" />)
  .route('/tests/:id/settings', <TestDetails tab="settings" />)
  .route('/tests/:id/settings/:settingsTab', <TestDetails tab="settings" />)

  .route('/test-suites', <TestSuitesList />)
  .route('/test-suites/:id', <TestSuiteDetails tab="executions" />)
  .route('/test-suites/:id/executions', <TestSuiteDetails tab="executions" />)
  .route('/test-suites/:id/executions/:execId', <TestSuiteDetails tab="executions" />)
  .route('/test-suites/:id/commands', <TestSuiteDetails tab="commands" />)
  .route('/test-suites/:id/settings', <TestSuiteDetails tab="settings" />)
  .route('/test-suites/:id/settings/:settingsTab', <TestSuiteDetails tab="settings" />)

  .define(data<(tab: string) => void>()('setExecutionTab'))
  .define(slot<{key: string; label: ReactNode; children: ReactNode}>()('testExecutionTabs'))
  .define(slot<{key: string} & Omit<MessagePanelProps, 'onClose'>>()('testExecutionLogOutputBanners'))
  .define(slot<ReactNode>()('deleteTestExtension'))
  .define(slot<ReactNode>()('deleteTestSuiteExtension'))
  .define(slot<ReactNode>()('testSuitesListTitleAddon'))

  .provider(({useData}) => (
    <StoreProvider store={initializeTestsStore} dependencies={[useData.select(x => x.useApiEndpoint)()]} />
  ))
  .data({useTests, useTestsPick, useTestsField, useTestsSync})
  .provider(({useData}) => (
    <StoreProvider store={initializeTestSuitesStore} dependencies={[useData.select(x => x.useApiEndpoint)()]} />
  ))
  .data({useTestSuites, useTestSuitesPick, useTestSuitesField, useTestSuitesSync})
  .provider(({useData}) => (
    <StoreProvider store={initializeEntityDetailsStore} dependencies={[useData.select(x => x.useApiEndpoint)()]} />
  ))
  .data({useEntityDetails, useEntityDetailsPick, useEntityDetailsField, useEntityDetailsSync})
  .provider(({useData}) => (
    <StoreProvider store={initializeExecutionDetailsStore} dependencies={[useData.select(x => x.useApiEndpoint)()]} />
  ))
  .data({useExecutionDetails, useExecutionDetailsPick, useExecutionDetailsField, useExecutionDetailsSync})
  .provider(({useData}) => (
    <StoreProvider
      store={initializeLogOutputStore}
      dependencies={[useData.select(x => x.useApiEndpoint)(), window.location.pathname]}
    />
  ))
  .data({useLogOutput, useLogOutputPick, useLogOutputField, useLogOutputSync})

  .init(tk => {
    tk.slots.rtkServices.add(testSuitesApi);
    tk.slots.rtkServices.add(testsApi);

    // TODO: Instead of using tk.sync, use all the necessities directly in the plugin components
    tk.data.setExecutionTab = tk.sync(() => {
      const entityId = tk.data.useEntityDetails(x => x.id);
      const id = tk.data.useExecutionDetails(x => x.id);
      return useDashboardNavigate((next: string) => `/tests/${entityId}/executions/${id}/${next}`);
    });

    tk.slots.siderItems.add({path: '/tests', icon: TestsIcon, title: 'Tests'}, {order: -120});
    tk.slots.siderItems.add({path: '/test-suites', icon: TestSuitesIcon, title: 'Test Suites'}, {order: -100});

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
          return <LogOutput logOutput={output || errorMessage} executionId={id} isRunning={status === 'running'} />;
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
      const featuresMap = tk.data.useExecutors(x => x.featuresMap);
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
      {order: -100, enabled: mayHaveArtifacts}
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
      {order: -80, enabled: () => !isReadOnlyEntity()}
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
      {order: -60, enabled: () => Boolean(getDecomposedVars()?.length)}
    );
  });
