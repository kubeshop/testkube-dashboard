import React, { useState } from 'react';
import { DatePicker } from 'antd';
import styled from 'styled-components';
import moment, { Moment } from 'moment';

import { Typography, Button } from '@atoms';

import { TestsContext } from '@context/testsContext';

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
  const [selectedDate, setSelectedDate] = useState<Moment>();
  const tests: any = React.useContext(TestsContext);

  const handleDatePicker = (value: any, dateString: any) => {
    tests.setSelectedTest({ id: null, testName: null });

    setSelectedDate(value);
    tests.setFilterByDate(dateString);

  };

  const getTodayTests = React.useCallback(() => {
    tests.setSelectedTest({ id: null, testName: null });
    let currentDate = moment();
    setSelectedDate(currentDate);
    tests.setFilterByDate(currentDate.format('MM-DD-YYYY'));


  }, [tests.filterByDate]);

  return (
    <StyledDateContainer>
      <Typography variant="quaternary">Results for</Typography>
      <DatePicker
        value={selectedDate}
        size="large"
        style={datePickerStyles}
        onChange={handleDatePicker}
        format="MM-DD-YYYY"
        disabled={!tests?.testsExecution?.results}
      />
      <Button disabled={!tests?.testsExecution?.results} onClick={getTodayTests}>
        Today
      </Button>
    </StyledDateContainer>
  );
};

export default ResultDatePicker;
