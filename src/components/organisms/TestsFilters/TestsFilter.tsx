import React from 'react';
import styled from 'styled-components';

import {Typography, Button} from '@atoms';

const StyleTestsFilterContainer = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

const StyleTestFilterButtons = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
`;

const TestsFilter = () => {
  return (
    <StyleTestsFilterContainer>
      <Typography variant="secondary">Tests</Typography>
      <StyleTestFilterButtons>
        <Typography variant="secondary">Show: </Typography>
        <Button>All</Button>
        <Button>Running</Button>
        <Button>Passed</Button>
        <Button>Failed</Button>
      </StyleTestFilterButtons>
    </StyleTestsFilterContainer>
  );
};

export default TestsFilter;
