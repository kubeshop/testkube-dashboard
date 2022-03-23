import {useContext} from 'react';

import {DashboardInfoPanelSecondLevelContext} from '@contexts';

import {StyledAntTabPane, StyledAntTabs, StyledTestExecutionDetailsTabsContainer} from '../ExecutionDetails.styled';
import TestExecutionDetailsArtifacts from './TestExecutionDetailsArtifacts';
import TestExecutionDetailsLogOutput from './TestExecutionDetailsLogOutput';
import TestExecutionDetailsResults from './TestExecutionDetailsResults';

const TestExecutionDetailsTabs = () => {
  const {data} = useContext(DashboardInfoPanelSecondLevelContext);

  return (
    <StyledTestExecutionDetailsTabsContainer>
      <StyledAntTabs>
        <StyledAntTabPane tab="Results" key="ResultsPane">
          <TestExecutionDetailsResults />
        </StyledAntTabPane>
        <StyledAntTabPane tab="Log Output" key="LogOutputPane">
          <TestExecutionDetailsLogOutput />
        </StyledAntTabPane>
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
