import React, {useContext} from 'react';
import styled from 'styled-components';

import {ResultDatePicker, TestStatus} from '@molecules';

import {TestsContext} from '@context/testsContext';

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
  const tests: any = useContext(TestsContext);

  const getTotalTestsByType = (testType: string) => {
    if (tests.testsExecution) {
      // eslint-disable-next-line
      return testType + '/' + tests?.testsExecution?.totals?.results;
    }
  };

  return (
    <>
      <StyledTableCell>
        <ResultDatePicker />
      </StyledTableCell>
      <StyledTableCell>
        <TestStatus
          testTitle="Passed"
          totalTests={
            tests?.testsExecution?.totals?.passed?.toString() !== undefined
              ? getTotalTestsByType(tests?.testsExecution?.totals?.passed?.toString())
              : '0'
          }
          testTitleColor="white"
          totalTestsColor="yellow"
        />
      </StyledTableCell>
      <StyledTableCell>
        <TestStatus
          testTitle="Failed"
          totalTests={
            tests?.testsExecution?.totals?.failed?.toString() !== undefined
              ? getTotalTestsByType(tests?.testsExecution?.totals?.failed?.toString())
              : '0'
          }
          testTitleColor="white"
          totalTestsColor="yellow"
        />
      </StyledTableCell>
      <StyledTableCell>
        <TestStatus
          testTitle="Test Running"
          totalTests={
            tests?.testsExecution?.totals?.pending?.toString() !== undefined
              ? getTotalTestsByType(tests?.testsExecution?.totals?.pending?.toString())
              : '0'
          }
          testTitleColor="white"
          totalTestsColor="white"
        />
      </StyledTableCell>
      <StyledTableCell>
        <TestStatus
          testTitle="Total Tests Executed"
          totalTests={tests?.testsExecution?.totals?.results?.toString()}
          testTitleColor="white"
          totalTestsColor="white"
        />
      </StyledTableCell>
    </>
  );
};

export default TestResults;
