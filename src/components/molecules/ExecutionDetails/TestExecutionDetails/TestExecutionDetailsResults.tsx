import {useContext} from 'react';

import {StyledInfoPanelSection} from '@organisms/DashboardInfoPanel/DashboardInfoPanel.styled';

import {DashboardInfoPanelSecondLevelContext} from '@contexts';

import {StyledStatusCode} from '../ExecutionDetails.styled';

const TestExecutionDetailsResults = () => {
  const {data} = useContext(DashboardInfoPanelSecondLevelContext);

  const {executionResult} = data;

  return (
    <StyledInfoPanelSection>
      <StyledStatusCode>Status code: {executionResult?.status}</StyledStatusCode>
    </StyledInfoPanelSection>
  );
};

export default TestExecutionDetailsResults;
