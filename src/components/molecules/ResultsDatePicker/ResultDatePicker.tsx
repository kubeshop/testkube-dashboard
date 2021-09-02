import React from 'react';
import styled from 'styled-components';
import {DatePicker} from 'antd';

import {Typography} from '@atoms';

const StyledDatePicker = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: left;
  gap: var(--space-md);
`;

const datePickerStyles = {
  background: 'var(--color-dark-primary)',
  color: 'var(--color-light-primary)',
  'border-left': 'none',
  'border-top': 'none',
  'border-right': 'none',
  'border-bottom': '1px solid var(--color-light-primary)',
};

const ResultDatePicker = () => {
  return (
    <StyledDatePicker>
      <Typography variant="quaternary">Results for</Typography>
      <DatePicker size="large" style={datePickerStyles} />
    </StyledDatePicker>
  );
};

export default ResultDatePicker;
