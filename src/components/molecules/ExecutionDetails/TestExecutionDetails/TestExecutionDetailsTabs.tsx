import {useContext} from 'react';

import {Execution} from '@models/execution';

import {useAppSelector} from '@redux/hooks';
import {selectExecutorsFeaturesMap} from '@redux/reducers/executorsSlice';

import {CLICommands, ExecutionsVariablesList, LogOutput} from '@molecules';

import useIsRunning from '@hooks/useIsRunning';

import {decomposeVariables} from '@utils/variables';

import {ExecutionDetailsContext} from '@contexts';

import {StyledAntTabPane, StyledAntTabs, StyledTestExecutionDetailsTabsContainer} from '../ExecutionDetails.styled';
import TestExecutionDetailsArtifacts from './TestExecutionDetailsArtifacts';

const TestExecutionDetailsTabs: React.FC = () => {
  const {data} = useContext(ExecutionDetailsContext);
  const executorsFeaturesMap = useAppSelector(selectExecutorsFeaturesMap);

  const testData = data as Execution;

  const {
    testType,
    executionResult: {status, output},
    name,
    variables,
    id,
  } = testData;

  const isRunning = useIsRunning(status);

  const decomposedVars = decomposeVariables(variables || {});

  const whetherToShowArtifactsTab = executorsFeaturesMap[testType]?.includes('artifacts');

  return (
    <StyledTestExecutionDetailsTabsContainer>
      <StyledAntTabs>
        <StyledAntTabPane tab="Log Output" key="LogOutputPane">
          <LogOutput logOutput={output} executionId={id} isRunning={isRunning} />
        </StyledAntTabPane>
        {whetherToShowArtifactsTab ? (
          <StyledAntTabPane tab="Artifacts" key="ArtifactsPane">
            <TestExecutionDetailsArtifacts id={id} />
          </StyledAntTabPane>
        ) : null}
        <StyledAntTabPane tab="CLI Commands" key="CLICommands">
          <CLICommands isExecutions type={testType} name={name} modifyMap={{status}} />
        </StyledAntTabPane>
        {decomposedVars ? (
          <StyledAntTabPane tab="Variables" key="Variables">
            <ExecutionsVariablesList variables={decomposedVars} />
          </StyledAntTabPane>
        ) : null}
      </StyledAntTabs>
    </StyledTestExecutionDetailsTabsContainer>
  );
};

export default TestExecutionDetailsTabs;
