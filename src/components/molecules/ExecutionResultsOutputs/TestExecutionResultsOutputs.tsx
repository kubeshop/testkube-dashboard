import {useEffect, useState} from 'react';

import {Collapse, Tabs} from 'antd';

import {nanoid} from '@reduxjs/toolkit';

import {useAppSelector} from '@redux/hooks';
import {selectedTestExecutionStatus} from '@redux/reducers/executionsSlice';
import {getStatus} from '@redux/utils/requestFilters';

import {RenderTestStatusSvgIcon} from '@atoms';

import {AssertionResult, Step} from '@types';

import {
  StyledCollapse,
  StyledLabelledFailedOnlyCheckbox,
  StyledPendingTestExecution,
  StyledShowFailedStepsContainer,
  StyledTestAssertionResultsContainer,
  StyledTestDescriptionContainer,
  StyledTestOutputAssertionErrorMessage,
  StyledTestOutputAssertionName,
  StyledTestOutputNameAndStatus,
  StyledTestStepAssertionContainer,
  StyledTestStepName,
  StyledTestStepNameContainer,
  StyledTestStepsOutPutContainer,
  StyledTestWithoutAssertions,
  TestsWithoutStepsContainer,
} from './ExecutionResultsOutputs.styled';

const {TabPane} = Tabs;

interface IStepHeader {
  name: string;
  status: string;
}

const RenderTestStepCollapseHeader = ({name, status}: IStepHeader) => {
  return (
    <StyledTestStepNameContainer>
      <RenderTestStatusSvgIcon testStatus={getStatus(status)} width={18} height={18} />
      <StyledTestStepName>{name}</StyledTestStepName>
    </StyledTestStepNameContainer>
  );
};

const RenderTestOutputWithAssertion = (step: Step) => {
  const {name, status, assertionResults} = step;
  return (
    <>
      {step && (
        <Collapse bordered={false} defaultActiveKey={nanoid()} expandIconPosition="right">
          <StyledCollapse header={<RenderTestStepCollapseHeader name={name} status={status} />} key={nanoid()}>
            {assertionResults?.map((assertionResult: AssertionResult) => (
              <StyledTestStepAssertionContainer key={nanoid()}>
                <StyledTestOutputNameAndStatus>
                  <RenderTestStatusSvgIcon testStatus={getStatus(assertionResult.status)} height={18} width={18} />
                  <StyledTestOutputAssertionName>{assertionResult?.name}</StyledTestOutputAssertionName>
                </StyledTestOutputNameAndStatus>

                <StyledTestOutputAssertionErrorMessage>
                  {assertionResult?.errorMessage}
                </StyledTestOutputAssertionErrorMessage>
              </StyledTestStepAssertionContainer>
            ))}
          </StyledCollapse>
        </Collapse>
      )}
    </>
  );
};

const RenderTestWithoutAssertion = (step: Step) => {
  const {name, status} = step;
  return (
    <>
      {step && (
        <StyledTestStepNameContainer>
          <StyledTestWithoutAssertions>
            <RenderTestStatusSvgIcon testStatus={getStatus(status)} width={18} height={18} />
            <StyledTestStepName>{name}</StyledTestStepName>
          </StyledTestWithoutAssertions>
        </StyledTestStepNameContainer>
      )}
    </>
  );
};

const TestExecutionResultsOutputs = (props: any) => {
  const {executionResult, execution} = props;

  const [showOnlyFailedSteps, setShowOnlyFailedSteps] = useState<boolean>(false);
  const [filteredExecutionResults, setFilteredExecutionResults] = useState<any[]>([]);

  const testExecutionStatus = useAppSelector(selectedTestExecutionStatus);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowOnlyFailedSteps(event.target.checked);
  };

  useEffect(() => {
    if (showOnlyFailedSteps) {
      if (!execution) {
        const filtered = executionResult?.steps?.filter((step: Step) => {
          return step.status === 'failed' || step.status === 'error';
        });

        setFilteredExecutionResults(filtered);
      } else {
        const filtered = execution?.filter((step: Step) => {
          return step.status === 'failed' || step.status === 'error';
        });

        setFilteredExecutionResults(filtered);
      }
    } else if (!execution) {
      setFilteredExecutionResults(executionResult?.steps);
    } else {
      setFilteredExecutionResults(execution);
    }
  }, [executionResult?.steps, execution, showOnlyFailedSteps]);

  return (
    <StyledTestDescriptionContainer>
      <Tabs
        style={{width: '100%'}}
        defaultActiveKey="1"
        tabBarExtraContent={
          <StyledShowFailedStepsContainer>
            <StyledLabelledFailedOnlyCheckbox htmlFor="failed">
              <input
                id="failed"
                type="checkbox"
                name="failed"
                onChange={handleCheckboxChange}
                className="filter-failed-checkbox"
              />
              <span>Show only failed steps</span>
            </StyledLabelledFailedOnlyCheckbox>
          </StyledShowFailedStepsContainer>
        }
      >
        <TabPane tab="Steps" key="1">
          <StyledTestStepsOutPutContainer>
            {filteredExecutionResults ? (
              filteredExecutionResults?.map((step: Step) => (
                <StyledTestAssertionResultsContainer key={nanoid()}>
                  {step.assertionResults && step.assertionResults.length !== 0 ? (
                    <RenderTestOutputWithAssertion {...step} />
                  ) : (
                    <RenderTestWithoutAssertion {...step} />
                  )}
                </StyledTestAssertionResultsContainer>
              ))
            ) : testExecutionStatus === 'pending' ? (
              <StyledPendingTestExecution>
                <span>Pending...</span>
              </StyledPendingTestExecution>
            ) : (
              <TestsWithoutStepsContainer>
                <span>This Execution has no steps!</span>
              </TestsWithoutStepsContainer>
            )}
          </StyledTestStepsOutPutContainer>
        </TabPane>
      </Tabs>
    </StyledTestDescriptionContainer>
  );
};

export default TestExecutionResultsOutputs;
