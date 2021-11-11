/* eslint react/destructuring-assignment: 0 */
import React, {useState} from 'react';
import {nanoid} from '@reduxjs/toolkit';
import {Collapse} from 'antd';

import {RenderTestStatusSvgIcon, Spinner, Typography} from '@atoms';
import {Step, AssertionResult, Test} from '@types';

import {selectedTestId} from '@redux/reducers/testsListSlice';
import {useGetTestByIdQuery} from '@src/services/tests';
import {useAppSelector} from '@redux/hooks';
import {
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
  StyledTestOutputDescription,
  StyledTestOutputsContainer,
  StyledTestStatusImage,
  StyledTestStepsOutPutContainer,
  StyledTestAssertionResultsContainer,
  TestsWithoutStepsContainer,
} from './TestDescription.styled';

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

const RenderTestWithoutAssertion = (step: Step) => {
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

const TestDescription = () => {
  const testId = useAppSelector(selectedTestId);

  const [togglePlainTestTest, setTogglePlainTestTest] = useState<boolean>(true);
  const handleOnClick = () => {
    setTogglePlainTestTest(!togglePlainTestTest);
  };

  const {data, error, isLoading} = useGetTestByIdQuery(testId, {});

  return (
    <>
      {error && <Typography variant="secondary">Something went wrong...</Typography>}
      {isLoading && <Spinner size="large" center />}
      {data && (
        <>
          <StyledTestStatusImage>
            <RenderTestStatusSvgIcon testStatus={data?.executionResult?.status} width={32} height={32} />
          </StyledTestStatusImage>
          <StyledTestOutputsContainer>
            <StyledTestOutputDescription>
              <Typography variant="tertiary" color="tertiary">
                {`${data?.scriptName}/${data?.name}`}
              </Typography>
              <Typography variant="secondary" color="quinary" cursor="pointer" onClick={handleOnClick}>
                {togglePlainTestTest ? 'View plain text' : 'View steps'}
              </Typography>
            </StyledTestOutputDescription>
            {!togglePlainTestTest ? (
              <RenderPlainTestOutput {...data} />
            ) : (
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
            )}
          </StyledTestOutputsContainer>
        </>
      )}
    </>
  );
};

export default TestDescription;
