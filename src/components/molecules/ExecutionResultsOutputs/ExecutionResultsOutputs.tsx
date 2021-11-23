import React, {useState} from 'react';
import {Collapse, Tabs} from 'antd';
import {nanoid} from '@reduxjs/toolkit';

import {RenderTestStatusSvgIcon} from '@atoms';

import {Step, AssertionResult, Test} from '@types';

import {getStatus} from '@src/redux/utils/requestFilters';
import {useAppSelector} from '@src/redux/hooks';
import {selectedTestExecutionStatus, selectedTestId} from '@src/redux/reducers/testsListSlice';
import {useGetArtifactsQuery} from '@src/services/tests';
import Artifacts from './Artifacts/Artifacts';
import {
  StyledTestDescriptionContainer,
  StyledPlainTextOutputContainer,
  StyledTestOutput,
  StyledText,
  StyledTestStepNameContainer,
  StyledTestStepName,
  StyledTestStepAssertionContainer,
  StyledTestOutputNameAndStatus,
  StyledTestOutputAssertionName,
  StyledTestOutputAssertionErrorMessage,
  StyledCollapse,
  StyledTestWithoutAssertions,
  StyledTestStepsOutPutContainer,
  StyledTestAssertionResultsContainer,
  TestsWithoutStepsContainer,
  StyledShowFailedStepsContainer,
  StyledLabelledFailedOnlyCheckbox,
  StyledPendingTestExecution,
} from './ExecutionResultsOutputs.styled';

interface IStepHeader {
  name: string;
  status: string;
}

const RenderPlainTestOutput = (data: Test) => {
  const {executionResult} = data;
  return (
    <StyledPlainTextOutputContainer>
      <StyledTestOutput>
        {data && (
          <StyledText key={nanoid()}>
            <pre>{executionResult?.output}</pre>
          </StyledText>
        )}
      </StyledTestOutput>
    </StyledPlainTextOutputContainer>
  );
};

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

const ExecutionResultsOutputs = ({data}: {data: any}) => {
  const [togglePlainTestTest, setTogglePlainTestTest] = useState<boolean>(true);
  const [showOnlyFailedSteps, setShowOnlyFailedSteps] = useState<boolean>(false);
  const [filteredExecutionResults, setFilteredExecutionResults] = useState<any[]>([]);
  const testId = useAppSelector(selectedTestId);
  const testExecutionStatus = useAppSelector(selectedTestExecutionStatus);

  const {TabPane} = Tabs;

  const handleOnClick = () => {
    setTogglePlainTestTest(!togglePlainTestTest);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowOnlyFailedSteps(event.target.checked);
  };

  const {data: artifacts} = useGetArtifactsQuery(testId, {
    skip: !testId,
  });

  React.useEffect(() => {
    if (showOnlyFailedSteps) {
      const filtered = data?.executionResult?.steps?.filter((step: Step) => {
        return step.status === 'failed';
      });
      setFilteredExecutionResults(filtered);
    } else {
      setFilteredExecutionResults(data?.executionResult?.steps);
    }
  }, [data?.executionResult?.steps, showOnlyFailedSteps]);

  return (
    <StyledTestDescriptionContainer>
      {/* eslint-disable-next-line react/jsx-no-bind */}
      <Tabs
        defaultActiveKey="1"
        // onChange={callback}
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

        <TabPane tab="Plain Text" key="2">
          <RenderPlainTestOutput {...data} />
        </TabPane>
        {artifacts && artifacts.length > 0 ? (
          <TabPane tab={`Artifacts(${artifacts ? artifacts?.length : 0})`} key="Artifacts">
            <Artifacts artifacts={artifacts} testId={testId && testId} />
          </TabPane>
        ) : (
          <TabPane tab="Artifacts" key="Artifacts" disabled>
            <Artifacts artifacts={artifacts} testId={testId && testId} />
          </TabPane>
        )}
      </Tabs>
    </StyledTestDescriptionContainer>
  );
};

export default ExecutionResultsOutputs;
