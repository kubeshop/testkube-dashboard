import {lazy, useContext, useEffect, useRef, useState} from 'react';

import debounce from 'lodash.debounce';

import {Execution} from '@models/execution';

import {useAppSelector} from '@redux/hooks';
import {selectExecutorsFeaturesMap} from '@redux/reducers/executorsSlice';

import {CLICommands, ExecutionsVariablesList} from '@molecules';

import useIsRunning from '@hooks/useIsRunning';

import {decomposeVariables} from '@utils/variables';

import {ExecutionDetailsContext} from '@contexts';

import {StyledAntTabPane, StyledAntTabs, StyledTestExecutionDetailsTabsContainer} from '../ExecutionDetails.styled';
import TestExecutionDetailsArtifacts from './TestExecutionDetailsArtifacts';

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

  return (
    <StyledTestExecutionDetailsTabsContainer ref={ref}>
      <StyledAntTabs>
        <StyledAntTabPane tab="Log Output" key="LogOutputPane">
          <LogOutput logOutput={output} executionId={id} isRunning={isRunning} isAutoScrolled={isAutoScrolled} />
        </StyledAntTabPane>
        {whetherToShowArtifactsTab ? (
          <StyledAntTabPane tab="Artifacts" key="ArtifactsPane">
            <TestExecutionDetailsArtifacts id={id} testName={testName} testSuiteName={testSuiteName} />
          </StyledAntTabPane>
        ) : null}
        <StyledAntTabPane tab="CLI Commands" key="CLICommands">
          <CLICommands isExecutions type={testType} id={id} modifyMap={{status}} />
        </StyledAntTabPane>
        {decomposedVars.length ? (
          <StyledAntTabPane tab="Variables" key="Variables">
            <ExecutionsVariablesList variables={decomposedVars} />
          </StyledAntTabPane>
        ) : null}
      </StyledAntTabs>
    </StyledTestExecutionDetailsTabsContainer>
  );
};

export default TestExecutionDetailsTabs;
