import React from 'react';
import styled from 'styled-components';

import {Typography, Button} from '@atoms';

import {TestsContext} from '@context/testsContext';

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
  const tests: any = React.useContext(TestsContext);

  return (
    <StyleTestsFilterContainer>
      <Typography variant="secondary">Tests</Typography>
      <StyleTestFilterButtons>
        <Typography variant="secondary">Show: </Typography>
        <Button onClick={() => tests.setSelectedTestTypes('all')}>All</Button>
        <Button onClick={() => tests.setSelectedTestTypes('pending')}>Running</Button>
        <Button onClick={() => tests.setSelectedTestTypes('success')}>Passed</Button>
        <Button onClick={() => tests.setSelectedTestTypes('failed')}>Failed</Button>
      </StyleTestFilterButtons>
    </StyleTestsFilterContainer>
  );
};

export default TestsFilter;
