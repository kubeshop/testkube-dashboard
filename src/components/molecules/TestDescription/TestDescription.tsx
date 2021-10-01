import React, {useContext, useState} from 'react';
import styled from 'styled-components';
import {useQuery} from 'react-query';
import {nanoid} from 'nanoid';
import {Collapse} from 'antd';

import {TestsContext} from '@context/testsContext';
import {RenderTestStatusSvgIcon, Typography} from '@atoms';

import {config} from '@constants/config';

import {Step, AssertionResult} from '@types';

interface IStepHeader {
  name: string;
  status: string;
}

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
  cursor: pointer;
`;

const StyledTestStepName = styled.span`
  margin-left: var(--space-xxs);
  font-size: var(--font-size-sm);
`;

const StyledTestAssertionResultsContainer = styled.div`
  display: flex;
  color: var(--color-light-primary);
  margin-bottom: var(--space-md);
`;

const StyledTestStepAssertionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--font-size-sm);
  margin-left: var(--space-md);
`;

const StyledTestOutputNameAndStatus = styled.div`
  display: flex;
`;

const StyledTestOutputAssertionName = styled.span`
  margin-left: var(--space-xxs);
  font-size: var(--font-size-sm);
  color: var(--color-light-primary);
`;

const StyledTestOutputAssertionErrorMessage = styled.span`
  font-size: var(--font-size-sm);
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

const StyledTestWithoutAssertions = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--space-x1l);
  background: var(--color-gray-dark);
  margin-bottom: var(--space-xxs);
  color: var(--color-light-primary);
  cursor: pointer;
  padding-left: var(--space-md);
`;

const StyledTestStepCollapseHeader = ({name, status}: IStepHeader) => {
  return (
    <StyledTestStepNameContainer>
      <RenderTestStatusSvgIcon testStatus={status} width={20} height={20} />
      <StyledTestStepName>{name}</StyledTestStepName>
    </StyledTestStepNameContainer>
  );
};

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
                      <StyledTestAssertionResultsContainer>
                        {step.assertionResults && step.assertionResults.length !== 0 ? (
                          <Collapse bordered={false} defaultActiveKey={nanoid()} expandIconPosition="right">
                            <StyledCollapse
                              header={<StyledTestStepCollapseHeader name={step.name} status={step.status} />}
                              key={nanoid()}
                            >
                              {step?.assertionResults &&
                                step?.assertionResults?.map((assertionResult: AssertionResult) => {
                                  return (
                                    <StyledTestStepAssertionContainer>
                                      <StyledTestOutputNameAndStatus>
                                        <RenderTestStatusSvgIcon
                                          testStatus={assertionResult.status}
                                          height={20}
                                          width={20}
                                        />
                                        <StyledTestOutputAssertionName>
                                          {assertionResult?.name}
                                        </StyledTestOutputAssertionName>
                                      </StyledTestOutputNameAndStatus>

                                      <StyledTestOutputAssertionErrorMessage>
                                        {assertionResult?.errorMessage}
                                      </StyledTestOutputAssertionErrorMessage>
                                    </StyledTestStepAssertionContainer>
                                  );
                                })}
                            </StyledCollapse>
                          </Collapse>
                        ) : (
                          <StyledTestStepNameContainer>
                            <StyledTestWithoutAssertions>
                              <RenderTestStatusSvgIcon testStatus={step.status} width={20} height={20} />
                              <StyledTestStepName>{step.name}</StyledTestStepName>
                            </StyledTestWithoutAssertions>
                          </StyledTestStepNameContainer>
                        )}
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
