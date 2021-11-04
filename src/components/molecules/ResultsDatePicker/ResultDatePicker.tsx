import {useDispatch} from 'react-redux';
import styled from 'styled-components';
import React, {useState} from 'react';
import moment, {Moment} from 'moment';
import {DatePicker} from 'antd';

import {clearFiltredData, selectFilters} from '@src/features/testsList/testsListSlice';
import {useAppSelector} from '@src/app/hooks';
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
  const [selectedDate, setSelectedDate] = useState<Moment | null>(null);
  const [clicked, setClicked] = useState<boolean>(false);
  const filters = useAppSelector(selectFilters);
  const dispatch = useDispatch();
  const handleDatePicker = (value: any, dateString: any) => {
    setSelectedDate(value);

    const date = moment(dateString).format('YYYY-DD-MM');

    dispatch(clearFiltredData({page: 0, status: undefined, date: date === 'Invalid date' ? undefined : date}));
  };

  const handleClick = () => {
    setClicked(!clicked);
    if (!clicked) {
      setSelectedDate(moment());

      dispatch(clearFiltredData({page: 0, status: undefined, date: moment().format('YYYY-DD-MM')}));
    } else {
      setSelectedDate(null);
      dispatch(clearFiltredData({page: 0, status: undefined, date: undefined}));
    }
  };

  return (
    <StyledDateContainer>
      <Typography variant="quaternary">Results for</Typography>
      <DatePicker
        value={selectedDate}
        size="large"
        style={datePickerStyles}
        onChange={handleDatePicker}
        format="MM-DD-YYYY"
      />
      <Button
        active={moment(selectedDate).format('YYYY-DD-MM') === moment().format('YYYY-DD-MM')}
        onClick={handleClick}
      >
        Today
      </Button>
    </StyledDateContainer>
  );
};

export default ResultDatePicker;
