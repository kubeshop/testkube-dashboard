import React, {useContext} from 'react';
import styled from 'styled-components';

import {ResultDatePicker, TestStatus} from '@molecules';

import {TestsContext} from '@context/testsContext';

const StyledTableCell = styled.td`
  border-right-style: hidden;
  border-bottom-style: hidden;
  word-wrap: break-word;
  flex-grow: 1;

  &:first-child {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border-left-style: hidden;
    flex-grow: 2;
  }
`;

const TestResults = () => {
  const tests: any = useContext(TestsContext);

  const getTotalTestsByType = (testType: string) => {
    if (tests.data) {
      // eslint-disable-next-line
      return testType + ' / ' + tests?.data?.totals?.results;
    }
  };

  return (
    <>
      <StyledTableCell>
        <ResultDatePicker />
      </StyledTableCell>
      <StyledTableCell>
        <TestStatus testTitle="Passed" totalTests={getTotalTestsByType(tests?.data?.totals?.passed.toString())} />
      </StyledTableCell>
      <StyledTableCell>
        <TestStatus testTitle="Error" totalTests={getTotalTestsByType(tests?.data?.totals?.failed.toString())} />
      </StyledTableCell>
      <StyledTableCell>
        <TestStatus
          testTitle="Test Running"
          totalTests={getTotalTestsByType(tests?.data?.totals?.pending.toString())}
        />
      </StyledTableCell>
      <StyledTableCell>
        <TestStatus testTitle="Total Tests Executed" totalTests={tests?.data?.totals?.results.toString()} />
      </StyledTableCell>
    </>
  );
};

export default TestResults;
