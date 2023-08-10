import {useEffect} from 'react';
import {useParams} from 'react-router-dom';

import {Tabs} from 'antd';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';

import {Execution} from '@models/execution';

import {CLICommands, ExecutionsVariablesList, LogOutput} from '@molecules';

import {usePluginSlotList, usePluginState} from '@plugins/pluginHooks';
import {TestExecutionTabsInterface} from '@plugins/types';

import {useAppSelector} from '@redux/hooks';
import {selectExecutorsFeaturesMap} from '@redux/reducers/executorsSlice';

import {useEntityDetailsPick} from '@store/entityDetails';
import {useExecutionDetailsPick} from '@store/executionDetails';

import {decomposeVariables} from '@utils/variables';

import TestExecutionArtifacts from './TestExecutionArtifacts';

const TestExecutionTabs: React.FC = () => {
  const {data: execution} = useExecutionDetailsPick('data') as {data: Execution};
  const {entity, details} = useEntityDetailsPick('entity', 'details');
  const [, setTestExecutionTabsData] = usePluginState<TestExecutionTabsInterface>('testExecutionTabs');
  const {id: entityId, execDetailsTab} = useParams();

  const executorsFeaturesMap = useAppSelector(selectExecutorsFeaturesMap);

  const {
    testType,
    executionResult: {status, output},
    variables,
    id,
    testName,
    testSuiteName,
    startTime,
  } = execution;

  const isRunning = status === 'running';

  const decomposedVars = decomposeVariables(variables || {});

  const whetherToShowArtifactsTab = executorsFeaturesMap[testType]?.includes('artifacts');

  const setExecutionTab = useDashboardNavigate((next: string) => `/${entity}/${entityId}/executions/${id}/${next}`);

  useEffect(() => {
    setTestExecutionTabsData({execution, test: details});
  }, [execution, details]);

  const defaultExecutionTabs = [
    {
      value: {
        key: 'log-output',
        label: 'Log Output',
        children: <LogOutput logOutput={output} executionId={id} isRunning={isRunning} onChangeTab={setExecutionTab} />,
      },
      metadata: {
        order: Infinity,
      },
    },
    {
      value: {
        key: 'artifacts',
        label: 'Artifacts',
        children: (
          <TestExecutionArtifacts
            id={id}
            testName={testName}
            testSuiteName={testSuiteName}
            startTime={startTime.toString()}
          />
        ),
      },
      metadata: {
        order: 3,
        visible: () => whetherToShowArtifactsTab,
      },
    },
    {
      value: {
        key: 'cli-commands',
        label: 'CLI Commands',
        children: <CLICommands isExecutions type={testType} id={id} modifyMap={{status}} />,
      },
      metadata: {
        order: 2,
      },
    },
    {
      value: {
        key: 'variables',
        label: 'Variables',
        children: <ExecutionsVariablesList variables={decomposedVars} />,
      },
      metadata: {
        order: 1,
        visible: () => decomposedVars.length,
      },
    },
  ];

  const items = usePluginSlotList('testExecutionTabs', defaultExecutionTabs);

  return <Tabs defaultActiveKey="log-output" activeKey={execDetailsTab} onChange={setExecutionTab} items={items} />;
};

export default TestExecutionTabs;
