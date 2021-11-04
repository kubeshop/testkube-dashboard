import styled from 'styled-components';
import React from 'react';

import {selectedTestId} from '@src/features/testsList/testsListSlice';
import {TestsList, TestDescription} from '@molecules';
import {useAppSelector} from '@src/app/hooks';

const StyledTestList = styled.td`
  min-width: 55%;
  max-width: 55%;
  overflow: hidden;
  overflow-y: scroll;
  border-right: 1px solid var(--color-gray-secondary);
  flex-grow: 1;
  border-top-style: hidden;
  border-left-style: hidden;
  border-bottom-style: hidden;
`;

const StyledTestDescription = styled.td`
  display: flex;
  border: hidden;
  flex-grow: 4;
  min-width: 45%;
  max-width: 45%;
  border-right-style: hidden;
`;

const TestsSummary = () => {
  const testId = useAppSelector(selectedTestId);

  return (
    <>
      <StyledTestList>
        <TestsList />
      </StyledTestList>
      <StyledTestDescription>{testId && <TestDescription />}</StyledTestDescription>
    </>
  );
};

export default TestsSummary;
