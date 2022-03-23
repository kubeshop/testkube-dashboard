import {useContext} from 'react';

import {StyledInfoPanelSection} from '@organisms/DashboardInfoPanel/DashboardInfoPanel.styled';

import {DashboardInfoPanelSecondLevelContext} from '@contexts';

import TestSuiteExecutionResultsList from './TestSuiteExecutionResultsList';

const TestSuiteExecutionDetailsAllSteps = () => {
  const {data} = useContext(DashboardInfoPanelSecondLevelContext);

  return (
    <StyledInfoPanelSection>
      <TestSuiteExecutionResultsList />
    </StyledInfoPanelSection>
  );
};

export default TestSuiteExecutionDetailsAllSteps;
