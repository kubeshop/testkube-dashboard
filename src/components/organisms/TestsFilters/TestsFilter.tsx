import React from 'react';
import styled from 'styled-components';

import {Typography, Button} from '@atoms';

import {TestsContext} from '@context/testsContext';

const StyledTestTextDescription = styled.td`
  border: none;
`;

const StyleTestFilterButtons = styled.td`
  display: flex;
  align-items: baseline;
  justify-content: center;
  border: none;
`;

const TestsFilter = () => {
  const tests: any = React.useContext(TestsContext);

  return (
    <>
      <StyledTestTextDescription>
        <Typography variant="secondary" data-testid="Test filters">
          Tests
        </Typography>
      </StyledTestTextDescription>
      <StyleTestFilterButtons>
        <Typography variant="secondary">Show: </Typography>
        <Button onClick={() => tests.setSelectedTestTypes('all')}>All</Button>
        <Button onClick={() => tests.setSelectedTestTypes('pending')}>Running</Button>
        <Button onClick={() => tests.setSelectedTestTypes('success')}>Passed</Button>
        <Button onClick={() => tests.setSelectedTestTypes('error')}>Failed</Button>
      </StyleTestFilterButtons>
    </>
  );
};

export default TestsFilter;
