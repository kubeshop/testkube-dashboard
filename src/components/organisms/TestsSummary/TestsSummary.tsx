import React from 'react';
import styled from 'styled-components';

import {TestsList, TestDescription} from '@molecules';

const StyledTestList = styled.td`
  height: 400px;
  max-height: 500px;
  min-width: 40%;
  max-width: 40%;
  overflow: hidden;
  overflow-y: scroll;
  border-right: 1px solid var(--color-gray-secondary);
  flex-grow: 1;
`;

const StyledTestDescription = styled.td`
  display: flex;
  border: hidden;
  flex-grow: 4;
  min-width: 60%;
  max-width: 60%;
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
