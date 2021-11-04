import {useDispatch} from 'react-redux';
import styled from 'styled-components';
import React, {useState} from 'react';
import moment from 'moment';
import {DatePicker} from 'antd';

import {clearFiltredData, selectFilters} from '@redux/reducers/testsListSlice';
import {useAppSelector} from '@redux/hooks';
import {Typography, Button} from '@atoms';

const StyledDateContainer = styled.div`
  display: flex;
  align-items: baseline;
  margin-left: 14px;

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
  const [clicked, setClicked] = useState<boolean>(false);
  const filters = useAppSelector(selectFilters);
  const dispatch = useDispatch();
  const handleDatePicker = (value: any, dateString: any) => {
    const date = moment(dateString).format('YYYY-DD-MM');

    dispatch(clearFiltredData({page: 0, status: undefined, date: date === 'Invalid date' ? undefined : date}));
  };

  const handleClick = () => {
    setClicked(!clicked);
    if (!clicked) {
      dispatch(clearFiltredData({page: 0, status: undefined, date: moment().format('YYYY-DD-MM')}));
    } else {
      dispatch(clearFiltredData({page: 0, status: undefined, date: undefined}));
    }
  };

  return (
    <StyledDateContainer>
      <Typography variant="quaternary">Results for</Typography>
      <DatePicker
        value={filters?.date ? moment(filters?.date) : null}
        size="large"
        style={datePickerStyles}
        onChange={handleDatePicker}
        format="MM-DD-YYYY"
      />
      <Button active={filters?.date === moment().format('YYYY-DD-MM')} onClick={handleClick}>
        Today
      </Button>
    </StyledDateContainer>
  );
};

export default ResultDatePicker;
