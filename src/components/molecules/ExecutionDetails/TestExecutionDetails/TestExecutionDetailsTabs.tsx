import {lazy, useContext, useEffect, useRef, useState} from 'react';

import {Tabs} from 'antd';

import debounce from 'lodash.debounce';
import {Tab} from 'rc-tabs/lib/interface';

import {Execution} from '@models/execution';

import {useAppSelector} from '@redux/hooks';
import {selectExecutorsFeaturesMap} from '@redux/reducers/executorsSlice';

import {CLICommands, ExecutionsVariablesList} from '@molecules';

import useIsRunning from '@hooks/useIsRunning';

import {decomposeVariables} from '@utils/variables';

import {ExecutionDetailsContext} from '@contexts';

import TestExecutionDetailsArtifacts from './TestExecutionDetailsArtifacts';
import TestExecutionDetailsAI from './TestExecutionDetailsAI';

const LogOutput = lazy(() => import('@molecules').then(module => ({default: module.LogOutput})));

const TestExecutionDetailsTabs: React.FC = () => {
  const {data} = useContext(ExecutionDetailsContext);

  const executorsFeaturesMap = useAppSelector(selectExecutorsFeaturesMap);

  const ref = useRef<HTMLDivElement>(null);

  const [oldScroll, setOldScroll] = useState(0);
  const [isAutoScrolled, setAutoScrolledState] = useState(false);

  const testData = data as Execution;

  const {
    testType,
    executionResult: {status, output},
    name,
    variables,
    id,
    testName,
    testSuiteName,
  } = testData;

  const isRunning = useIsRunning(status);

  const decomposedVars = decomposeVariables(variables || {});

  const whetherToShowArtifactsTab = executorsFeaturesMap[testType]?.includes('artifacts');

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.onscroll = debounce(() => {
        setOldScroll(prev => {
          if (ref && ref.current) {
            if (prev > ref.current?.scrollTop) {
              setAutoScrolledState(false);
            } else {
              setAutoScrolledState(true);
            }

            return ref.current?.scrollTop;
          }

          return prev;
        });
      }, 50);
    }
  }, [oldScroll]);

  useEffect(() => {
    setTimeout(() => {
      setAutoScrolledState(true);
    }, 500);
  }, [id]);

  useEffect(() => {
    if (isRunning) {
      setAutoScrolledState(true);
    }
  }, [isRunning, id]);

  const items = [
    {
      key: 'LogOutputPane',
      label: 'Log Output',
      children: <LogOutput logOutput={output} executionId={id} isRunning={isRunning} isAutoScrolled={isAutoScrolled} />,
    },
    {
      key: 'AiInsightsPane',
      label: 'AI Insights',
      children: <TestExecutionDetailsAI id={id} testName={testName} testSuiteName={testSuiteName} />,
    },
    whetherToShowArtifactsTab
      ? {
          key: 'ArtifactsPane',
          label: 'Artifacts',
          children: <TestExecutionDetailsArtifacts id={id} testName={testName} testSuiteName={testSuiteName} />,
        }
      : null,
    {
      key: 'CLICommands',
      label: 'CLI Commands',
      children: <CLICommands isExecutions type={testType} id={id} modifyMap={{status}} />,
    },
    decomposedVars.length
      ? {
          key: 'Variables',
          label: 'Variables',
          children: <ExecutionsVariablesList variables={decomposedVars} />,
        }
      : null,
  ].filter(Boolean) as Tab[];

  return (
    <div ref={ref}>
      <Tabs items={items} />
    </div>
  );
};

export default TestExecutionDetailsTabs;
