import {useContext} from 'react';

import {Execution} from '@models/execution';

import {CLICommands, LogOutput} from '@molecules';
import {ExecutionsVariablesList} from '@molecules/Variables/VariablesLists';

import useIsRunning from '@hooks/useIsRunning';

import {decomposeVariables} from '@utils/variables';

import {ExecutionDetailsContext} from '@contexts';

import {StyledAntTabPane, StyledAntTabs, StyledTestExecutionDetailsTabsContainer} from '../ExecutionDetails.styled';
import TestExecutionDetailsArtifacts from './TestExecutionDetailsArtifacts';

const TestExecutionDetailsTabs: React.FC = () => {
  const {data} = useContext(ExecutionDetailsContext);

  const testData = data as Execution;

  const {
    testType,
    executionResult: {status, output, errorMessage},
    name,
    variables,
    id,
  } = testData;

  const isRunning = useIsRunning(status);

  const decomposedVars = decomposeVariables(variables);

  return (
    <StyledTestExecutionDetailsTabsContainer>
      <StyledAntTabs>
        <StyledAntTabPane tab="Log Output" key="LogOutputPane">
          <LogOutput logOutput={output} executionId={name} isRunning={isRunning} />;
        </StyledAntTabPane>
        <StyledAntTabPane tab="Artifacts" key="ArtifactsPane">
          <TestExecutionDetailsArtifacts id={id} />
        </StyledAntTabPane>
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
