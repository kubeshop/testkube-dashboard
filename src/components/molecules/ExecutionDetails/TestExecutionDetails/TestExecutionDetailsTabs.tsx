import {useContext, useEffect} from 'react';
import {useParams} from 'react-router-dom';

import {Tabs} from 'antd';

import {DashboardContext} from '@contexts';

import useIsRunning from '@hooks/useIsRunning';
import {useLastCallback} from '@hooks/useLastCallback';

import {Execution} from '@models/execution';

import {CLICommands, ExecutionsVariablesList, LogOutput} from '@molecules';

import {usePluginSlotList, usePluginState} from '@plugins/pluginHooks';
import {TestExecutionTabsInterface} from '@plugins/types';

import {useAppSelector} from '@redux/hooks';
import {selectExecutorsFeaturesMap} from '@redux/reducers/executorsSlice';

import {useEntityDetailsPick} from '@store/entityDetails';
import {useExecutionDetailsPick} from '@store/executionDetails';

import {decomposeVariables} from '@utils/variables';

import TestExecutionDetailsArtifacts from './TestExecutionDetailsArtifacts';

const TestExecutionDetailsTabs: React.FC = () => {
  const {data} = useExecutionDetailsPick('data');
  const {details} = useEntityDetailsPick('details');
  const [, setTestExecutionTabsData] = usePluginState<TestExecutionTabsInterface>('testExecutionTabs');
  const {entity} = useEntityDetailsPick('entity');
  const {id: entityId, execDetailsTab} = useParams();
  const {navigate} = useContext(DashboardContext);
  const executorsFeaturesMap = useAppSelector(selectExecutorsFeaturesMap);

  const execution = data as Execution;

  const {
    testType,
    executionResult: {status, output},
    variables,
    id,
    testName,
    testSuiteName,
    startTime,
  } = execution;

  const isRunning = useIsRunning(status);

  const decomposedVars = decomposeVariables(variables || {});

  const whetherToShowArtifactsTab = executorsFeaturesMap[testType]?.includes('artifacts');

  const setExecutionTab = useLastCallback((nextTab: string) => {
    navigate(`/${entity}/${entityId}/executions/${id}/${nextTab}`);
  });

  useEffect(() => {
    setTestExecutionTabsData({execution, test: details});
  }, [execution, details]);

  const defaultExecutionDetailsTabs = [
    {
      value: {
        key: 'log-output',
        label: 'Log Output',
        children: (
          <LogOutput
            logOutput={output}
            executionId={id}
            isRunning={isRunning}
            onChangeTab={(tab: string) => {
              setExecutionTab(tab);
            }}
          />
        ),
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
          <TestExecutionDetailsArtifacts
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

  const items = usePluginSlotList('testExecutionTabs', defaultExecutionDetailsTabs);

  return (
    <Tabs
      defaultActiveKey="log-output"
      activeKey={execDetailsTab}
      onChange={activeKey => {
        setExecutionTab(activeKey);
      }}
      items={items}
    />
  );
};

export default TestExecutionDetailsTabs;
