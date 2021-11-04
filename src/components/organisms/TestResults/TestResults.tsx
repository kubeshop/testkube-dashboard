import React from 'react';
import styled from 'styled-components';

import {selectTotals} from '@src/features/testsList/testsListSlice';
import {ResultDatePicker, TestStatus} from '@molecules';
import {useAppSelector} from '@src/app/hooks';

const StyledTableCell = styled.td`
  display: flex;
  justify-content: center;
  align-items: center;
  border-right-style: hidden;
  border-bottom-style: hidden;
  word-wrap: break-word;
  flex-grow: 1;

  &:first-child {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-left-style: hidden;
    flex-grow: 2;
  }
`;

const TestResults = () => {
  const totals = useAppSelector(selectTotals);

  return (
    <>
      <StyledTableCell>
        <ResultDatePicker />
      </StyledTableCell>
      <StyledTableCell>
        <TestStatus
          testTitle="Total Passed"
          totalTests={totals?.passed}
          testTitleColor="white"
          totalTestsColor="yellow"
        />
      </StyledTableCell>
      <StyledTableCell>
        <TestStatus
          testTitle="Total Failed"
          totalTests={totals?.failed}
          testTitleColor="white"
          totalTestsColor="yellow"
        />
      </StyledTableCell>
      <StyledTableCell>
        <TestStatus
          testTitle="Total Running"
          totalTests={totals?.pending}
          testTitleColor="white"
          totalTestsColor="white"
        />
      </StyledTableCell>
      <StyledTableCell>
        <TestStatus
          testTitle="Total Executed"
          totalTests={totals?.results}
          testTitleColor="white"
          totalTestsColor="white"
        />
      </StyledTableCell>
    </>
  );
};

export default TestResults;
