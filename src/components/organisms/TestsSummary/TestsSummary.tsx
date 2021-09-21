import React from 'react';
import styled from 'styled-components';

import {TestsList, TestDescription} from '@molecules';

const StyledTestList = styled.td`
  height: 400px;
  max-height: 500px;
  overflow: hidden;
  overflow-y: scroll;
  border-right: 1px solid var(--color-gray-secondary);
  flex-grow: 1;
`;

const StyledTestDescription = styled.td`
  display: flex;
  position: relative;
  left: var(--space-md);
  top: var(--space-md);
  border: hidden;
  flex-grow: 4;
  border-right-style: hidden;
`;

const TestsSummary = () => {
  return (
    <>
      <StyledTestList>
        <TestsList />
      </StyledTestList>
      <StyledTestDescription>
        <TestDescription />
      </StyledTestDescription>
    </>
  );
};

export default TestsSummary;
