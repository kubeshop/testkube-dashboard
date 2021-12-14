import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

import {DatePicker} from 'antd';

import moment from 'moment';

import {useAppSelector} from '@redux/hooks';
import {clearFiltredData, selectFilters} from '@redux/reducers/testsListSlice';

const datePickerStyles = {
  color: 'var(--color-dark-quaternary)',
  backgroundColor: 'var(--color-dark-primary)',
  border: '1px solid var(--color-dark-quaternary)',
  width: '250px',
  height: '36px',
};

const ResultDatePicker = () => {
  const [clicked, setClicked] = useState<boolean>(false);
  const filters = useAppSelector(selectFilters);
  const dispatch = useDispatch();
  const {RangePicker} = DatePicker;

  // const handleDatePicker = (value: any, dateString: any) => {
  //   dispatch(clearFiltredData({status: undefined, date: dateString}));
  // };

  const handleDateRange = (_: any, dateString: any) => {
    if (!dateString) {
      dispatch(clearFiltredData({...filters, startDate: null, endDate: null}));
    } else {
      dispatch(clearFiltredData({...filters, startDate: dateString[0], endDate: dateString[1]}));
    }
  };

  const handleClick = () => {
    setClicked(!clicked);
    if (!clicked) {
      dispatch(clearFiltredData({status: undefined, date: moment().toString()}));
    } else {
      dispatch(clearFiltredData({status: undefined, date: null}));
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
        format="YYYY-MM-DD"
        value={[filters?.startDate && moment(filters?.startDate), filters?.endDate && moment(filters?.endDate)]}
      />
    </>
  );
};

export default ResultDatePicker;
