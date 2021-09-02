import React from 'react';
import styled from 'styled-components';

import {ResultDatePicker, TestStatus} from '@molecules';

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
  return (
    <StyledTestResults>
      <ResultDatePicker />
      <StyledTableCell>
        <TestStatus testTitle="Passed" totalTests="8/10" />
      </StyledTableCell>
      <StyledTableCell>
        <TestStatus testTitle="Failed" totalTests="8/10" />
      </StyledTableCell>
      <StyledTableCell>
        <TestStatus testTitle="Test Running" totalTests="4/10" />
      </StyledTableCell>
      <StyledTableCell>
        <TestStatus testTitle="Total Tests Executed" totalTests="14" />
      </StyledTableCell>
    </StyledTestResults>
  );
};

export default TestResults;
