import React from 'react';
import styled from 'styled-components';

import {Typography, Button} from '@atoms';

const StyleTestsFilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyleTestFilterButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TestsFilter = () => {
  return (
    <StyleTestsFilterContainer>
      <Typography variant="secondary">Tests</Typography>
      <StyleTestFilterButtons>
        <Button>All</Button>
        <Button>Running</Button>
        <Button>Passed</Button>
        <Button>Failed</Button>
      </StyleTestFilterButtons>
    </StyleTestsFilterContainer>
  );
};

export default TestsFilter;
