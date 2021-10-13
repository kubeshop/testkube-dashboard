import React, {useState} from 'react';
import {DatePicker} from 'antd';
import styled from 'styled-components';

import {Typography, Button} from '@atoms';

import {TestsContext} from '@context/testsContext';

const StyledDateContainer = styled.div`
  display: flex;
  align-items: baseline;

  & > * {
    flex: 1 1 auto;
    margin: 5px;
  }
`;

const datePickerStyles = {
  color: 'var(--color-light-primary)',
  backgroundColor: 'var(--color-dark-primary)',
  borderLeft: 'none',
  borderTop: 'none',
  borderRight: 'none',
  borderBottom: '1px solid var(--color-light-primary)',
};

const ResultDatePicker = () => {
  const [toggleGetTest, setToggleGetTest] = useState<boolean>(false);
  const tests: any = React.useContext(TestsContext);

  const handleDatePicker = (_value: any, dateString: any) => {
    tests.filters.dateFilter = dateString;
    tests.setFilters(tests.filters);
  };

  const getLatestDateTest = React.useCallback(() => {
    if (tests.filters?.filter?.indexOf('latest') === -1) {
      tests.filters?.filter?.push('latest');
    } else {
      const filtered = tests?.filters?.filter?.filter((filter: string) => filter !== 'latest');
      tests.setFilters({...tests.filters, status: filtered});
    }
  }, [tests?.filters?.filter]);

  React.useEffect(() => {
    if (tests.testsExecution) {
      setToggleGetTest(true);
    }
  }, [tests.testsExecution]);

  return (
    <StyledDateContainer>
      <Typography variant="primary">Results for</Typography>
      <DatePicker size="large" style={datePickerStyles} onChange={handleDatePicker} disabled={!tests.testsExecution} />
      <Button disabled={!toggleGetTest} onClick={getLatestDateTest}>
        Latest
      </Button>
    </StyledDateContainer>
  );
};

export default ResultDatePicker;
