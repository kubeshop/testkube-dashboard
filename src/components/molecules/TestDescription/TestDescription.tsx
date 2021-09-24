import React, {useContext, useState} from 'react';
import styled from 'styled-components';
import {useQuery} from 'react-query';
import {nanoid} from 'nanoid';

import {TestsContext} from '@context/testsContext';
import {RenderTestStatusSvgIcon, Typography} from '@atoms';

import {config} from '@constants/config';

const StyledTestStatus = styled.div`
  display: flex;
  text-align: justify;
  position: relative;
  left: var(--space-md);
  top: var(--space-md);
`;

const StyledTestDescription = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  left: var(--space-lg);
`;

const StyledOutputContainer = styled.div`
  position: relative;
  top: var(--space-md);
  width: 100%;
  max-height: 400px;
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

const TestDescription = () => {
  const [api, setApi] = useState<string>(localStorage.getItem(config.apiEndpoint) || '');
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
      ? 'PENDING'
      : testStatus === 'error'
      ? 'ERROR'
      : testStatus === 'success'
      ? 'SUCCESS'
      : testStatus === 'queued'
      ? 'QUEUED'
      : '';
  };

  return (
    <>
      {error && <Typography variant="secondary">Something went wrong...</Typography>}
      {tests?.selectedTest && data && (
        <>
          <StyledTestStatus>
            <RenderTestStatusSvgIcon testStatus={data.executionResult.status} width={50} height={50} />
            <Typography variant="secondary">TEST {renderTestStatus(data.executionResult.status)}</Typography>
          </StyledTestStatus>
          <StyledTestDescription>
            <StyledOutputContainer>
              <StyledTestOutput>
                {data.executionResult.output.split('\n').map((i: any) => {
                  return <StyledText key={nanoid()}>{i}</StyledText>;
                })}
              </StyledTestOutput>
            </StyledOutputContainer>
          </StyledTestDescription>
        </>
      )}
    </>
  );
};

export default TestDescription;
