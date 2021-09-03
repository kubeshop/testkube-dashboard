import React, {useContext} from 'react';
import styled from 'styled-components';

import {ResultDatePicker, TestStatus} from '@molecules';

import {TestsContext} from '@context/testsContext';

const StyledTestResults = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledTableCell = styled.td`
  border-right-style: hidden;
  border-bottom-style: hidden;
  display: flex;
  align-items: center;
  flex-direction: column;

  &:first-child {
    border-left-style: hidden;
  }

  display: flex;
`;

const TestResults = () => {
  const tests: any = useContext(TestsContext);

  const getTotalTestsByType = (testType: string) => {
    const filteredTests = tests?.ExecutionSummary?.filter((test: any) => test.status === testType).length;
    // eslint-disable-next-line
    return filteredTests && filteredTests + ' / ' + tests?.ExecutionSummary?.length;
  };

  return (
    <StyledTestResults>
      <ResultDatePicker />
      <StyledTableCell>
        <TestStatus testTitle="Passed" totalTests={getTotalTestsByType('success')} />
      </StyledTableCell>
      <StyledTableCell>
        <TestStatus testTitle="Failed" totalTests={getTotalTestsByType('failed')} />
      </StyledTableCell>
      <StyledTableCell>
        <TestStatus testTitle="Test Running" totalTests={getTotalTestsByType('running')} />
      </StyledTableCell>
      <StyledTableCell>
        <TestStatus testTitle="Total Tests Executed" totalTests={tests && tests.ExecutionSummary.length} />
      </StyledTableCell>
    </StyledTestResults>
  );
};

export default TestResults;
