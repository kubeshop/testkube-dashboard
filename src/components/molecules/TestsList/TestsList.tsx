import React, {useContext} from 'react';
import styled from 'styled-components';
import {nanoid} from 'nanoid';

import {RenderTestStatusSvgIcon, Typography, TestTypeIcon, Spinner} from '@atoms';

import {TestsContext} from '@context/testsContext';
import {timeStampToDate, getDuration} from '@utils/formatDate';

import {Result} from '@types';
import {truncateText} from '@utils';

const StyledTestListContainer = styled.div`
  display: block;
  width: 100%;
`;

const StyledTestListRow = styled.div`
  display: flex;
  align-items: baseline;
  flex-flow: row wrap;
  position: relative;
  top: var(--space-md);
  transition: 0.5s;

  &:not(:first-child):hover {
    cursor: pointer;
    background: transparent linear-gradient(90deg, #1890fc 0%, #5bdad3 100%);
  }

  background: ${props =>
    props?.className?.includes('selected') ? 'transparent linear-gradient(90deg, #1890fc 0%, #5bdad3 100%)' : ''};
`;

const StyledTestListCell = styled.div`
  /* text-align: left; */
  white-space: nowrap;
  padding-right: 10%;
  width: 15%;

  &:nth-child(1) {
    width: 25%;
  }

  &:nth-child(2) {
    width: 25%;
    margin-left: -20px;
  }

  &:nth-child(4) {
    margin-left: 30px;
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
          <Typography variant="secondary" color="secondary" font="bold" wrap>
            Name
          </Typography>
        </StyledTestListCell>

        <StyledTestListCell>
          <Typography variant="secondary" color="secondary" font="bold">
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
            onClick={() => handleSelectedTest(test.id, test.scriptName)}
          >
            <StyledTestListCell role="cell">
              <Typography variant="secondary" color="secondary" font="light">
                {test.scriptName ? truncateText(test.scriptName) : '-'}
              </Typography>
            </StyledTestListCell>
            <StyledTestListCell role="cell">
              <Typography variant="secondary" color="secondary" font="light" wrap>
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
