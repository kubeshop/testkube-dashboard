import {
  StyledAntTabPane,
  StyledAntTabs,
  StyledTestSuiteExecutionDetailsTabsContainer,
} from '../ExecutionDetails.styled';
import TestSuiteExecutionDetailsAllSteps from './TestSuiteExecutionDetailsAllSteps';

const TestSuiteExecutionDetailsTabs = () => {
  return (
    <StyledTestSuiteExecutionDetailsTabsContainer>
      <StyledAntTabs>
        <StyledAntTabPane tab="All Steps" key="AllStepsPane">
          <TestSuiteExecutionDetailsAllSteps />
        </StyledAntTabPane>
      </StyledAntTabs>
    </StyledTestSuiteExecutionDetailsTabsContainer>
  );
};

export default TestSuiteExecutionDetailsTabs;
