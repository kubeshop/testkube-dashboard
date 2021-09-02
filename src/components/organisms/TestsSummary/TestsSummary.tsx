import React from 'react';
import styled from 'styled-components';

import {TestsList, TestDescription} from '@molecules';

const StyledTestsContainer = styled.div`
  display: flex;
`;

const StyledTestSummaryContainer = styled.td`
  border: none;

  &:first-child {
    border-right: 1px solid var(--color-gray-secondary);
  }
`;

const TestsSummary = () => {
  return (
    <StyledTestsContainer>
      <StyledTestSummaryContainer>
        <TestsList />
      </StyledTestSummaryContainer>
      <StyledTestSummaryContainer>
        <TestDescription />
      </StyledTestSummaryContainer>
    </StyledTestsContainer>
  );
};

export default TestsSummary;
