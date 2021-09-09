import React from 'react';
import styled from 'styled-components';

import {Typography} from '@atoms';

interface ITestStatusProps {
  testTitle: string;
  totalTests: string;
}

const StyledTestTitleResult = styled.div`
  position: relative;
  left: 50px;
`;

const TestStatus: React.FC<ITestStatusProps> = ({testTitle, totalTests}) => {
  return (
    <>
      <StyledTestTitleResult>
        <Typography variant="secondary" color="tertiary">
          {testTitle}
        </Typography>
      </StyledTestTitleResult>
      <StyledTestTitleResult>
        <Typography variant="quinary" color="quaternary">
          {totalTests}
        </Typography>
      </StyledTestTitleResult>
    </>
  );
};

export default TestStatus;
