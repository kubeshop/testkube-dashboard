/* eslint react/destructuring-assignment: 0 */
import React, {useContext, useState} from 'react';
import {nanoid} from 'nanoid';
import {Collapse} from 'antd';
import {RenderTestStatusSvgIcon, Typography, Spinner} from '@atoms';

import {TestsContext} from '@context/testsContext';
import {Step, AssertionResult, Test} from '@types';

import {useFetchTest} from '@hooks';
import {
  StyledTestStatusImage,
  StyledTestOutputsContainer,
  StyledTestOutputDescription,
  StyledPlainTextOutputContainer,
  StyledTestOutput,
  StyledText,
  StyledTestStepsOutPutContainer,
  StyledTestStepNameContainer,
  StyledTestStepName,
  StyledTestAssertionResultsContainer,
  StyledTestStepAssertionContainer,
  StyledTestOutputNameAndStatus,
  StyledTestOutputAssertionName,
  StyledTestOutputAssertionErrorMessage,
  StyledCollapse,
  StyledTestWithoutAssertions,
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
        {data &&
          data?.executionResult?.output?.split('\n').map((i: any) => {
            return <StyledText key={nanoid()}>{i}</StyledText>;
          })}
      </StyledTestOutput>
    </StyledPlainTextOutputContainer>
  );
};

const RenderTestStepCollapseHeader = ({name, status}: IStepHeader) => {
  return (
    <StyledTestStepNameContainer>
      <RenderTestStatusSvgIcon testStatus={status} width={20} height={20} />
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
                  <RenderTestStatusSvgIcon testStatus={assertionResult.status} height={20} width={20} />
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
            <RenderTestStatusSvgIcon testStatus={step.status} width={20} height={20} />
            <StyledTestStepName>{step.name}</StyledTestStepName>
          </StyledTestWithoutAssertions>
        </StyledTestStepNameContainer>
      )}
    </>
  );
};

const TestDescription = () => {
  const [togglePlainTestTest, setTogglePlainTestTest] = useState<boolean>(true);
  const tests: any = useContext(TestsContext);

  const {data, error, isLoading} = useFetchTest();

  const handleOnClick = () => {
    setTogglePlainTestTest(!togglePlainTestTest);
  };

  return (
    <>
      {error && <Typography variant="secondary">Something went wrong...</Typography>}
      {isLoading && <Spinner />}
      {tests?.selectedTest.id && data && (
        <>
          <StyledTestStatusImage>
            <RenderTestStatusSvgIcon testStatus={data?.executionResult?.status} width={32} height={32} />
          </StyledTestStatusImage>
          <StyledTestOutputsContainer>
            <StyledTestOutputDescription>
              <Typography variant="tertiary" color="tertiary">
                {tests?.selectedTest?.testName || ''}
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
