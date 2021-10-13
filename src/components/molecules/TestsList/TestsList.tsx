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
  margin-left: 25px;
`;

const StyledTestListRow = styled.div`
  display: flex;
  align-items: center;
  flex-flow: row wrap;
  transition: 0.5s;

  &:not(:first-child):hover {
    cursor: pointer;
    background: transparent linear-gradient(90deg, #1890fc 0%, #5bdad3 100%);
  }
`;

const StyledTestListCell = styled.div`
  width: calc(100% / 5);
  text-align: left;
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
          <Typography variant="secondary" color="secondary" font="bold">
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
      {tests?.testsExecution?.results &&
        tests?.testsExecution?.results?.map((test: Result) => (
          <StyledTestListRow key={nanoid()} onClick={() => handleSelectedTest(test.id, test.scriptName)}>
            <StyledTestListCell role="cell">
              <Typography variant="secondary" font="light">
                {test.scriptName ? truncateText(test.scriptName) : '-'}
              </Typography>
            </StyledTestListCell>
            <StyledTestListCell role="cell">
              <Typography variant="secondary" font="light">
                {test.startTime ? timeStampToDate(test.startTime) : '-'}
              </Typography>
            </StyledTestListCell>
            <StyledTestListCell role="cell">
              <Typography variant="secondary" font="light">
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
        ))}
    </StyledTestListContainer>
  );
};

export default TestsList;
