import React, {useContext} from 'react';
import styled from 'styled-components';
import {nanoid} from 'nanoid';

import {RenderTestStatusSvgIcon, Typography, TestTypeIcon, Spinner} from '@atoms';

import {TestsContext} from '@context/testsContext';
import {timeStampToDate, getDuration} from '@utils/formatDate';

import {Result} from '@types';

const StyledTestListContainer = styled.div`
  display: block;
  width: 100%;
  margin-top: 10px;
`;

const StyledTestListRow = styled.div`
  display: flex;
  align-items: center;
  flex-flow: row wrap;
  position: relative;
  transition: 0.5s;
  height: 50px;

  &:not(:first-child):hover {
    cursor: pointer;
    background: transparent linear-gradient(90deg, #1890fc 0%, #5bdad3 100%);
  }

  background: ${props =>
    props?.className?.includes('selected') ? 'transparent linear-gradient(90deg, #1890fc 0%, #5bdad3 100%)' : ''};
`;

const StyledTestListCell = styled.div`
  white-space: nowrap;

  &:nth-child(1) {
    width: calc(100% - 440px);
    padding-left: 20px;
  }

  &:nth-child(2) {
    width: 200px;
  }

  &:nth-child(3) {
    width: 100px;
  }

  &:nth-child(4) {
    width: 60px;
  }

  &:nth-child(5) {
    width: 60px;
    margin-right: 20px;
  }
`;

const TestsList = () => {
  const tests: any = useContext(TestsContext);

  const handleSelectedTest = (id: string, testName: string) => {
    tests?.setSelectedTest({id, testName});
  };

  return (
    <StyledTestListContainer>
      <StyledTestListRow>
        <StyledTestListCell>
          <Typography variant="secondary" color="secondary" font="bold" leftAlign>
            Name
          </Typography>
        </StyledTestListCell>

        <StyledTestListCell>
          <Typography variant="secondary" color="secondary" font="bold" leftAlign>
            Started At
          </Typography>
        </StyledTestListCell>

        <StyledTestListCell>
          <Typography variant="secondary" color="secondary" font="bold">
            Duration
          </Typography>
        </StyledTestListCell>

        <StyledTestListCell>
          <Typography variant="secondary" color="secondary" font="bold">
            Status
          </Typography>
        </StyledTestListCell>

        <StyledTestListCell>
          <Typography variant="secondary" color="secondary" font="bold">
            Type
          </Typography>
        </StyledTestListCell>
      </StyledTestListRow>
      {tests?.isLoading && <Spinner />}
      {tests?.testsExecution?.results && !tests?.testsExecution?.errorMessage ? (
        tests?.testsExecution?.results?.map((test: Result) => (
          <StyledTestListRow
            className={tests?.selectedTest.id === test.id ? 'selected' : ''}
            key={nanoid()}
            onClick={() => handleSelectedTest(test.id, `${test.scriptName}/${test.name}`)}
          >
            <StyledTestListCell role="cell">
              <Typography variant="secondary" color="secondary" font="light" leftAlign nowrap>
                {test.scriptName ? `${test.scriptName} - ${test.name}` : '-'}
              </Typography>
            </StyledTestListCell>
            <StyledTestListCell role="cell">
              <Typography variant="secondary" color="secondary" font="light" leftAlign>
                {test.startTime ? timeStampToDate(test.startTime) : '-'}
              </Typography>
            </StyledTestListCell>
            <StyledTestListCell role="cell">
              <Typography variant="secondary" color="secondary" font="light">
                {test.endTime ? getDuration(test.startTime, test.endTime) : '-'}
              </Typography>
            </StyledTestListCell>
            <StyledTestListCell role="cell">
              <RenderTestStatusSvgIcon testStatus={test.status} width={25} height={25} />
            </StyledTestListCell>
            <StyledTestListCell role="cell">
              <TestTypeIcon testType={test.scriptType} width={30} height={30} />
            </StyledTestListCell>
          </StyledTestListRow>
        ))
      ) : (
        <Typography variant="secondary" font="light">
          {tests?.testsExecution?.errorMessage}
        </Typography>
      )}
    </StyledTestListContainer>
  );
};

export default TestsList;
