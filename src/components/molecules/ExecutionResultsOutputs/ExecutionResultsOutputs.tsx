/* eslint react/destructuring-assignment: 0 */
import React, {useState} from 'react';
import {Collapse, Tabs} from 'antd';
import {nanoid} from '@reduxjs/toolkit';

import {RenderTestStatusSvgIcon} from '@atoms';

import {ReactComponent as DownloadIcon} from '@assets/downloadFileIcon.svg';
import {ReactComponent as FileIcon} from '@assets/fileIcon.svg';
import {Step, AssertionResult, Test} from '@types';

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
  StyledArtifacts,
  StyledFileArtifactsFileName,
} from './ExecutionResultsOutputs.styled';

interface IStepHeader {
  name: string;
  status: string;
}

const RenderPlainTestOutput = (data: Test) => {
  return (
    <StyledPlainTextOutputContainer>
      <StyledTestOutput>
        {data && (
          <StyledText key={nanoid()}>
            <pre>{data?.executionResult?.output}</pre>
          </StyledText>
        )}
      </StyledTestOutput>
    </StyledPlainTextOutputContainer>
  );
};

const RenderTestStepCollapseHeader = ({name, status}: IStepHeader) => {
  return (
    <StyledTestStepNameContainer>
      <RenderTestStatusSvgIcon testStatus={status} width={24} height={24} />
      <StyledTestStepName>{name}</StyledTestStepName>
    </StyledTestStepNameContainer>
  );
};

const RenderTestOutputWithAssertion = (step: Step) => {
  return (
    <>
      {step && (
        <Collapse bordered={false} defaultActiveKey={nanoid()} expandIconPosition="right">
          <StyledCollapse
            header={<RenderTestStepCollapseHeader name={step.name} status={step.status} />}
            key={nanoid()}
          >
            {step?.assertionResults?.map((assertionResult: AssertionResult) => (
              <StyledTestStepAssertionContainer key={nanoid()}>
                <StyledTestOutputNameAndStatus>
                  <RenderTestStatusSvgIcon testStatus={assertionResult.status} height={24} width={24} />
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

const RenderTestWithoutAssertion = (step?: Step) => {
  return (
    <>
      {step && (
        <StyledTestStepNameContainer>
          <StyledTestWithoutAssertions>
            <RenderTestStatusSvgIcon testStatus={step.status} width={24} height={24} />
            <StyledTestStepName>{step.name}</StyledTestStepName>
          </StyledTestWithoutAssertions>
        </StyledTestStepNameContainer>
      )}
    </>
  );
};

const ExecutionResultsOutputs = (data: any) => {
  const [togglePlainTestTest, setTogglePlainTestTest] = useState<boolean>(true);
  const [showOnlyFailedSteps, setShowOnlyFailedSteps] = useState<boolean>(false);

  const {TabPane} = Tabs;

  const handleOnClick = () => {
    setTogglePlainTestTest(!togglePlainTestTest);
  };

  function callback(key: any) {
    console.log(key);
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowOnlyFailedSteps(event.target.checked);
  };

  return (
    <StyledTestDescriptionContainer>
      {/* eslint-disable-next-line react/jsx-no-bind */}
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Steps" key="1">
          <StyledTestStepsOutPutContainer>
            {data?.executionResult?.steps ? (
              data?.executionResult?.steps?.map((step: Step) => (
                <>
                  <StyledTestAssertionResultsContainer>
                    {step.assertionResults && step.assertionResults.length !== 0 ? (
                      <RenderTestOutputWithAssertion {...step} />
                    ) : (
                      <RenderTestWithoutAssertion {...step} />
                    )}
                  </StyledTestAssertionResultsContainer>
                </>
              ))
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

        <TabPane tab="Artifacts" key="Artifacts">
          <StyledArtifacts>
            <StyledFileArtifactsFileName>
              <FileIcon style={{marginRight: '10px', marginLeft: '20px'}} />
              <span>File 1</span>
            </StyledFileArtifactsFileName>
            <a href="https://assets.website-files.com/611f279603d61242ae80e191/61663e5db099f6a0cd003323_testkube-logo.svg">
              <DownloadIcon style={{marginRight: '12px', cursor: 'pointer'}} />
            </a>
          </StyledArtifacts>
        </TabPane>
      </Tabs>
      <StyledShowFailedStepsContainer>
        <StyledLabelledFailedOnlyCheckbox htmlFor="failed">
          <input type="checkbox" name="failed" onChange={handleCheckboxChange} className="filter-failed-checkbox" />
          <span>Show only failed steps</span>
        </StyledLabelledFailedOnlyCheckbox>
      </StyledShowFailedStepsContainer>
    </StyledTestDescriptionContainer>
  );
};

export default ExecutionResultsOutputs;
