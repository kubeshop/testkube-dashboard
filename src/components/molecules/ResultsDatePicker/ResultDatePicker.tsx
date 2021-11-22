import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import moment from 'moment';
import { DatePicker } from 'antd';

import { clearFiltredData, selectFilters } from '@redux/reducers/testsListSlice';
import { useAppSelector } from '@redux/hooks';

const datePickerStyles = {
  color: 'var(--color-dark-quaternary)',
  backgroundColor: 'var(--color-dark-primary)',
  border: '1px solid var(--color-dark-quaternary)',
  width: '306px',
  height: '40px',
};

const ResultDatePicker = () => {
  const [clicked, setClicked] = useState<boolean>(false);
  const filters = useAppSelector(selectFilters);
  const dispatch = useDispatch();
  const { RangePicker } = DatePicker;

  // const handleDatePicker = (value: any, dateString: any) => {
  //   dispatch(clearFiltredData({status: undefined, date: dateString}));
  // };

  const handleDateRange = (_: any, dateString: any) => {


    dispatch(clearFiltredData({ status: undefined, date: (dateString[0] === '' && dateString[1] === '') ? null : dateString }));
  };

  const handleClick = () => {
    setClicked(!clicked);
    if (!clicked) {
      dispatch(clearFiltredData({ status: undefined, date: moment().toString() }));
    } else {
      dispatch(clearFiltredData({ status: undefined, date: null }));
    }
  };

  return (
    <>
      {/* <DatePicker
        value={filters?.date ? moment(filters?.date) : null}
        size="large"
        style={datePickerStyles}
        onChange={handleDatePicker}
        format="MM-DD-YYYY"
      /> */}
      <RangePicker
        placeholder={['Select time', 'Select time']}
        style={datePickerStyles}
        onChange={handleDateRange}
        format="MM-DD-YYYY"
       />
    </>
  );
};

export default ResultDatePicker;
