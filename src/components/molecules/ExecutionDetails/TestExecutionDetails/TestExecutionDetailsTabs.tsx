import {useContext} from 'react';

import {DashboardContext} from '@organisms/DashboardContainer/DashboardContainer';

import {DashboardInfoPanelSecondLevelContext} from '@contexts';

import {CLICommands} from '../..';
import {StyledAntTabPane, StyledAntTabs, StyledTestExecutionDetailsTabsContainer} from '../ExecutionDetails.styled';
import TestExecutionDetailsArtifacts from './TestExecutionDetailsArtifacts';
import TestExecutionDetailsLogOutput from './TestExecutionDetailsLogOutput';

const TestExecutionDetailsTabs = () => {
  const {data} = useContext(DashboardInfoPanelSecondLevelContext);
  const {entityType} = useContext(DashboardContext);

  return (
    <StyledTestExecutionDetailsTabsContainer>
      <StyledAntTabs>
        {entityType !== 'test-suites' ? (
          <StyledAntTabPane tab="Log Output" key="LogOutputPane">
            <TestExecutionDetailsLogOutput />
          </StyledAntTabPane>
        ) : null}
        {data.testType === 'cypress/project' || data.testType === 'soapui/xml' ? (
          <StyledAntTabPane tab="Artifacts" key="ArtifactsPane">
            <TestExecutionDetailsArtifacts />
          </StyledAntTabPane>
        ) : null}
        <StyledAntTabPane tab="CLI Commands" key="CLICommands">
          <CLICommands isExecutions />
        </StyledAntTabPane>
      </StyledAntTabs>
    </StyledTestExecutionDetailsTabsContainer>
  );
};

export default TestExecutionDetailsTabs;
