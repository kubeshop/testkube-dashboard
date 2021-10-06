import React from 'react';
import styled from 'styled-components';

import { Typography, Button } from '@atoms';

import { TestsContext } from '@context/testsContext';

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
  const filtersTests = (status: string) => {
    
    if (tests.filters.indexOf(status) === -1) {
   
      tests.filters.push(status);
      tests.setFilters(tests.filters);
      console.log("push");
    } else {
    
      const filtered = tests.filters.filter((filter: string )=> filter !== status);
      tests.setFilters(filtered);
      console.log("filter");
    }
  };
  return (
    <>
      <StyledTestTextDescription>
        <Typography variant="secondary" data-testid="Test filters">
          Tests
        </Typography>
      </StyledTestTextDescription>
      <StyleTestFilterButtons>
        <Typography variant="secondary">Show: </Typography>
        <Button disabled={!tests.testsExecution} onClick={() => filtersTests('all')}>
          All
        </Button>
        <Button  disabled={!tests.testsExecution} onClick={() => filtersTests('pending')}>
          Running
        </Button>
        <Button disabled={!tests.testsExecution} onClick={() => filtersTests('success')}>
          Passed
        </Button>
        <Button disabled={!tests.testsExecution} onClick={() => filtersTests('error')}>
          Failed
        </Button>
      </StyleTestFilterButtons>
    </>
  );
};

export default TestsFilter;
