import {useContext} from 'react';

import {DashboardContext} from '@organisms/DashboardContainer/DashboardContainer';

import {DashboardInfoPanelSecondLevelContext} from '@contexts';

import {StyledAntTabPane, StyledAntTabs, StyledTestExecutionDetailsTabsContainer} from '../ExecutionDetails.styled';
import TestExecutionDetailsArtifacts from './TestExecutionDetailsArtifacts';
import TestExecutionDetailsLogOutput from './TestExecutionDetailsLogOutput';
import TestExecutionDetailsResults from './TestExecutionDetailsResults';

const TestExecutionDetailsTabs = () => {
  const {data} = useContext(DashboardInfoPanelSecondLevelContext);
  const {entityType} = useContext(DashboardContext);

  return (
    <StyledTestExecutionDetailsTabsContainer>
      <StyledAntTabs>
        <StyledAntTabPane tab="Results" key="ResultsPane">
          <TestExecutionDetailsResults />
        </StyledAntTabPane>
        {entityType !== 'test-suites' ? (
          <StyledAntTabPane tab="Log Output" key="LogOutputPane">
            <TestExecutionDetailsLogOutput />
          </StyledAntTabPane>
        ) : null}
        {data.testType === 'cypress/project' ? (
          <StyledAntTabPane tab="Artifacts" key="ArtifactsPane">
            <TestExecutionDetailsArtifacts />
          </StyledAntTabPane>
        ) : null}
      </StyledAntTabs>
    </StyledTestExecutionDetailsTabsContainer>
  );
};

export default TestExecutionDetailsTabs;
