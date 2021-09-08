import React from 'react';
import styled from 'styled-components';
import {DatePicker} from 'antd';

import {Typography, Button} from '@atoms';

import {TestsContext} from '@context/testsContext';

const StyledDatePicker = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: left;
  gap: var(--space-md);
`;

const datePickerStyles = {
  color: 'var(--color-light-primary)',
  'border-left': 'none',
  'border-top': 'none',
  'border-right': 'none',
  'border-bottom': '1px solid var(--color-light-primary)',
};

const ResultDatePicker = () => {
  const tests: any = React.useContext(TestsContext);

  const handleDatePicker = (date: any, dateString: any) => {
    tests.setSelectedTimeIntervalTests(dateString);
  };

  return (
    <>
      <StyledDatePicker>
        <Typography variant="quaternary">Results for</Typography>
        <DatePicker size="large" style={datePickerStyles} onChange={handleDatePicker} />
        <Button>Latest</Button>
      </StyledDatePicker>
    </>
  );
};

export default ResultDatePicker;
