import React from 'react';
import styled from 'styled-components';

// import {Typography} from '@atoms';

const StyledTestDescriptionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

// const StyledTestImage = styled.div`
//   width: 100%;
//   height: 100%;
// `;

const StyledTestName = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledTestDescription = styled.div`
  width: auto;
`;

const TestDescription = () => {
  return (
    <StyledTestDescriptionContainer>
      <StyledTestName>
        {/* <StyledTestImage>*Image</StyledTestImage> */}
        {/* <Typography variant="secondary">Test Name</Typography> */}
      </StyledTestName>
      <StyledTestDescription>
        {/* <Typography variant="secondary">Test Description</Typography> */}
      </StyledTestDescription>
    </StyledTestDescriptionContainer>
  );
};

export default TestDescription;
