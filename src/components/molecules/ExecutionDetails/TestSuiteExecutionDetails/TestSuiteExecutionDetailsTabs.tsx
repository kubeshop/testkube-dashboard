import {useContext} from 'react';

import {TestSuiteExecution} from '@models/testSuiteExecution';

import {ExecutionStepsList} from '@molecules';

import {ExecutionDetailsContext} from '@contexts';

import {
  StyledAntTabPane,
  StyledAntTabs,
  StyledTestSuiteExecutionDetailsTabsContainer,
} from '../ExecutionDetails.styled';

const TestSuiteExecutionDetailsTabs: React.FC = () => {
  const {data} = useContext(ExecutionDetailsContext);

  const testSuiteData = data as TestSuiteExecution;
  const {stepResults} = testSuiteData;

  return (
    <StyledTestSuiteExecutionDetailsTabsContainer>
      <StyledAntTabs>
        <StyledAntTabPane tab="All Steps" key="AllStepsPane">
          {stepResults ? <ExecutionStepsList executionSteps={stepResults} /> : null}
        </StyledAntTabPane>
      </StyledAntTabs>
    </StyledTestSuiteExecutionDetailsTabsContainer>
  );
};

export default TestSuiteExecutionDetailsTabs;
