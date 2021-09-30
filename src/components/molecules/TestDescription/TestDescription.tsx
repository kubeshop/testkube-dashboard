import React, {useContext, useState} from 'react';
import styled from 'styled-components';
import {useQuery} from 'react-query';
import {nanoid} from 'nanoid';
import {Collapse} from 'antd';

import {TestsContext} from '@context/testsContext';
import {RenderTestStatusSvgIcon, Typography} from '@atoms';

import {config} from '@constants/config';

import {Step, AssertionResult} from '@types';

const StyledTestStatusImage = styled.div`
  position: relative;
  top: var(--space-lg);
  left: var(--space-lg);
`;

const StyledTestOutputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 85%;
  margin-right: var(--space-lg);
  margin-left: var(--space-md);
  position: relative;
  top: var(--space-xl);
  left: var(--space-lg);
`;

const StyledTestOutputDescription = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;

  &:nth-child(1) {
    margin-right: var(--space-md);
  }
`;

const StyledPlainTextOutputContainer = styled.div`
  width: 100%;
  max-height: 300px;
  overflow: scroll;
  background-color: black;
  background-image: radial-gradient(rgba(0, 32, 150, 0.75), black 120%);
`;

const StyledTestOutput = styled.span`
  white-space: pre-line;
  color: white;
  text-shadow: 0 0 5px #c8c8c8;

  &::selection {
    background: #0080ff;
    text-shadow: none;
  }
`;

const StyledText = styled.span`
  display: flex;
`;

const StyledTestStepsOutPutContainer = styled.div`
  width: 100%;
  max-height: 300px;
  overflow: scroll;
`;

const StyledTestStepNameContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--space-x1l);
  background: var(--color-gray-dark);
  margin-bottom: var(--space-xxs);
  color: var(--color-light-primary);
`;

const StyledTestStepName = styled.span`
  margin-left: var(--space-xxs);
  font-size: var(--font-size-sm);
`;

const StyledTestStepStatusContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--space-x1l);
  background: var(--color-gray-dark);
  margin-bottom: var(--space-xxs);
  color: var(--color-light-primary);
`;

const StyledTestListStatusIcon = styled.div`
  margin-left: var(--space-xxs);
`;

const StyledTestStepStatus = styled.span`
  margin-left: var(--space-xxs);
  font-size: var(--font-size-sm);
`;

const StyledTestAssertionResultsContainer = styled.div`
  display: flex;
  color: var(--color-light-primary);
  margin-bottom: var(--space-md);
`;

const StyledTestStepStatusImageContainer = styled.div`
  display: flex;
`;

const StyledTestOutputResult = styled.span`
  margin-left: var(--space-xxs);
  font-size: var(--font-size-xs);
`;

const StyledTestStepOutputStatusCode = styled.span`
  display: flex;
  font-size: var(--font-size-xs);
  color: var(--color-light-primary);
`;

const StyledCollapse = styled(Collapse.Panel)`
  &&& {
    display: flex;
    flex-direction: column;
    align-items: baseline;
    border: none;
    height: 100%;
  }

  background: var(--color-gray-dark);
`;

const TestDescription = () => {
  const [api, setApi] = useState<string>(localStorage.getItem(config.apiEndpoint) || '');
  const [togglePlainTestTest, setTogglePlainTestTest] = useState<boolean>(true);
  const tests: any = useContext(TestsContext);

  const {data, error} = useQuery(['test', tests.selectedTest], () => {
    if (api) {
      return fetch(`${api}/${tests.selectedTest}`).then(res => res.json());
    }
  });

  React.useEffect(() => {
    const apiFromUser = localStorage.getItem(config.apiEndpoint);
    if (apiFromUser) {
      setApi(apiFromUser);
    }
  }, []);

  const renderTestStatus = (testStatus: string) => {
    return testStatus === 'pending'
      ? 'TEST PENDING'
      : testStatus === 'error'
      ? 'TEST ERROR'
      : testStatus === 'success'
      ? 'TEST SUCCESS'
      : testStatus === 'queued'
      ? 'TEST QUEUED'
      : '';
  };

  const handleOnClick = () => {
    setTogglePlainTestTest(!togglePlainTestTest);
  };

  return (
    <>
      {error && <Typography variant="secondary">Something went wrong...</Typography>}
      {tests?.selectedTest && data && (
        <>
          <StyledTestStatusImage>
            <RenderTestStatusSvgIcon testStatus={data?.executionResult?.status} width={50} height={50} />
          </StyledTestStatusImage>
          <StyledTestOutputsContainer>
            <StyledTestOutputDescription>
              <Typography variant="secondary">{renderTestStatus(data?.executionResult?.status)}</Typography>
              <Typography variant="secondary" color="quinary" cursor="pointer" onClick={handleOnClick}>
                {togglePlainTestTest ? 'View plain text' : 'View steps'}
              </Typography>
            </StyledTestOutputDescription>
            {!togglePlainTestTest ? (
              <>
                <StyledPlainTextOutputContainer>
                  <StyledTestOutput>
                    {data?.executionResult?.output.split('\n').map((i: any) => {
                      return <StyledText key={nanoid()}>{i}</StyledText>;
                    })}
                  </StyledTestOutput>
                </StyledPlainTextOutputContainer>
              </>
            ) : (
              <StyledTestStepsOutPutContainer>
                {data?.executionResult?.steps?.map((step: Step) => {
                  return (
                    <>
                      <StyledTestStepNameContainer>
                        <StyledTestStepName>Step Name: {step?.name}</StyledTestStepName>
                      </StyledTestStepNameContainer>
                      <StyledTestStepStatusContainer>
                        <StyledTestListStatusIcon>
                          <RenderTestStatusSvgIcon testStatus={step?.status} width={20} height={20} />
                        </StyledTestListStatusIcon>
                        <StyledTestStepStatus>{step?.status}</StyledTestStepStatus>
                      </StyledTestStepStatusContainer>
                      <StyledTestAssertionResultsContainer>
                        {step?.assertionResults &&
                          step?.assertionResults?.map((assertionResult: AssertionResult) => {
                            return (
                              <Collapse bordered={false} defaultActiveKey={nanoid()} expandIconPosition="right">
                                <StyledCollapse
                                  header={`Assertion Results (${step?.assertionResults?.length})`}
                                  key={nanoid()}
                                >
                                  <StyledTestStepStatusContainer>
                                    <StyledTestStepStatusImageContainer>
                                      <RenderTestStatusSvgIcon
                                        testStatus={assertionResult.status}
                                        height={20}
                                        width={20}
                                      />
                                      <StyledTestOutputResult>
                                        {renderTestStatus(assertionResult?.status)}
                                      </StyledTestOutputResult>
                                    </StyledTestStepStatusImageContainer>
                                  </StyledTestStepStatusContainer>
                                  <StyledTestStepOutputStatusCode>
                                    {assertionResult?.name}
                                  </StyledTestStepOutputStatusCode>
                                  <StyledTestStepOutputStatusCode>
                                    {assertionResult?.errorMessage}
                                  </StyledTestStepOutputStatusCode>
                                </StyledCollapse>
                              </Collapse>
                            );
                          })}
                      </StyledTestAssertionResultsContainer>
                    </>
                  );
                })}
              </StyledTestStepsOutPutContainer>
            )}
          </StyledTestOutputsContainer>
        </>
      )}
    </>
  );
};

export default TestDescription;
