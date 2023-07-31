import {useEffect, useRef, useState} from 'react';

import {Tabs} from 'antd';

import debounce from 'lodash.debounce';

import useIsRunning from '@hooks/useIsRunning';

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

  const executorsFeaturesMap = useAppSelector(selectExecutorsFeaturesMap);

  const ref = useRef<HTMLDivElement>(null);

  const [oldScroll, setOldScroll] = useState(0);
  const [isAutoScrolled, setAutoScrolledState] = useState(false);

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

  useEffect(() => {
    setTestExecutionTabsData({execution, test: details});
  }, [execution, details]);

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

  const defaultExecutionDetailsTabs = [
    {
      value: {
        key: 'LogOutputPane',
        label: 'Log Output',
        children: (
          <LogOutput logOutput={output} executionId={id} isRunning={isRunning} isAutoScrolled={isAutoScrolled} />
        ),
      },
      metadata: {
        order: Infinity,
      },
    },
    // TODO: refactor using visibility metadata
    whetherToShowArtifactsTab
      ? {
          value: {
            key: 'ArtifactsPane',
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
          },
        }
      : null,
    {
      value: {
        key: 'CLICommands',
        label: 'CLI Commands',
        children: <CLICommands isExecutions type={testType} id={id} modifyMap={{status}} />,
      },
      metadata: {
        order: 2,
      },
    },
    decomposedVars.length
      ? {
          value: {
            key: 'Variables',
            label: 'Variables',
            children: <ExecutionsVariablesList variables={decomposedVars} />,
          },
          metadata: {
            order: 1,
          },
        }
      : null,
  ].filter(Boolean);

  const items = usePluginSlotList('testExecutionTabs', defaultExecutionDetailsTabs);

  return (
    <div ref={ref}>
      <Tabs items={items} />
    </div>
  );
};

export default TestExecutionDetailsTabs;
