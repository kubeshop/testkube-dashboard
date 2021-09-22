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
      const filteredTests = tests.data.filter((test: any) => test.status === testType).length;

      // eslint-disable-next-line
      return filteredTests && filteredTests + ' / ' + tests?.data?.length;
    }
  };

  return (
    <>
      <StyledTableCell>
        <ResultDatePicker />
      </StyledTableCell>
      <StyledTableCell>
        <TestStatus testTitle="Passed" totalTests={getTotalTestsByType('success')} />
      </StyledTableCell>
      <StyledTableCell>
        <TestStatus testTitle="Error" totalTests={getTotalTestsByType('error')} />
      </StyledTableCell>
      <StyledTableCell>
        <TestStatus testTitle="Test Running" totalTests={getTotalTestsByType('pending')} />
      </StyledTableCell>
      <StyledTableCell>
        <TestStatus testTitle="Total Tests Executed" totalTests={tests && tests?.data?.length} />
      </StyledTableCell>
    </>
  );
};

export default TestResults;
