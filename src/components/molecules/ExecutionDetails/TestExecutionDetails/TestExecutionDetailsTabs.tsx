/* eslint-disable unused-imports/no-unused-imports-ts */
import {useContext} from 'react';

import {EntityExecutionsContext, ExecutionDetailsContext} from '@contexts';

import {CLICommands} from '../..';
import Variables from '../../Variables';
import {StyledAntTabPane, StyledAntTabs, StyledTestExecutionDetailsTabsContainer} from '../ExecutionDetails.styled';
import TestExecutionDetailsArtifacts from './TestExecutionDetailsArtifacts';
import TestExecutionDetailsLogOutput from './TestExecutionDetailsLogOutput';

const TestExecutionDetailsTabs: React.FC = () => {
  const {data} = useContext(ExecutionDetailsContext);
  const {entity} = useContext(EntityExecutionsContext);

  return (
    <StyledTestExecutionDetailsTabsContainer>
      <StyledAntTabs>
        {/* {entity !== 'test-suites' ? (
          <StyledAntTabPane tab="Log Output" key="LogOutputPane">
            <TestExecutionDetailsLogOutput />
          </StyledAntTabPane>
        ) : null} */}
        {/* {data.testType === 'cypress/project' || data.testType === 'soapui/xml' ? (
          <StyledAntTabPane tab="Artifacts" key="ArtifactsPane">
            <TestExecutionDetailsArtifacts />
          </StyledAntTabPane>
        ) : null} */}
        {/* <StyledAntTabPane tab="CLI Commands" key="CLICommands">
          <CLICommands isExecutions />
        </StyledAntTabPane>
        <StyledAntTabPane tab="Variables" key="Variables">
          <Variables isExecutions />
        </StyledAntTabPane> */}
      </StyledAntTabs>
    </StyledTestExecutionDetailsTabsContainer>
  );
};

export default TestExecutionDetailsTabs;
