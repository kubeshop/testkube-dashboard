import React, {useContext} from 'react';
import styled from 'styled-components';

import {ResultDatePicker, TestStatus} from '@molecules';

import {TestsContext} from '@context/testsContext';

const StyledTableCell = styled.td`
  border-right-style: hidden;
  border-bottom-style: hidden;
  border-top-style: hidden;
  width: 16%;
  word-wrap: break-word;

  &:first-child {
    border-left-style: hidden;
    width: 35%;
  }
`;

const TestResults = () => {
  const tests: any = useContext(TestsContext);

  const getTotalTestsByType = (testType: string) => {
    const filteredTests = tests?.data?.ExecutionSummary?.filter((test: any) => test.status === testType).length;
    // eslint-disable-next-line
    return filteredTests && filteredTests + ' / ' + tests?.data?.ExecutionSummary?.length;
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
        <TestStatus testTitle="Failed" totalTests={getTotalTestsByType('failed')} />
      </StyledTableCell>
      <StyledTableCell>
        <TestStatus testTitle="Test Running" totalTests={getTotalTestsByType('pending')} />
      </StyledTableCell>
      <StyledTableCell>
        <TestStatus testTitle="Total Tests Executed" totalTests={tests && tests?.data?.ExecutionSummary?.length} />
      </StyledTableCell>
    </>
  );
};

export default TestResults;
