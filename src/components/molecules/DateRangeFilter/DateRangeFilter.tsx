import {useDispatch} from 'react-redux';

import {DatePicker} from 'antd';

import moment from 'moment';

import {FilterProps} from '@models/filters';

const {RangePicker} = DatePicker;

const dateRangePickerStyles = {
  color: 'var(--color-dark-quaternary)',
  backgroundColor: 'var(--color-dark-primary)',
  border: '1px solid var(--color-dark-quaternary)',
  width: '250px',
  height: '36px',
};

const DateRangeFilter: React.FC<FilterProps> = props => {
  const {setFilters, filters} = props;

  const dispatch = useDispatch();

  const onDateRangeChange = (_: any, dateString: any) => {
    if (!dateString) {
      dispatch(setFilters({...filters, startDate: null, endDate: null}));
    } else {
      dispatch(setFilters({...filters, page: 0, startDate: dateString[0], endDate: dateString[1]}));
    }
  };

  return (
    <RangePicker
      placeholder={['Select date', 'Select date']}
      style={dateRangePickerStyles}
      onChange={onDateRangeChange}
      format="YYYY-MM-DD"
      value={[filters?.startDate && moment(filters?.startDate), filters?.endDate && moment(filters?.endDate)]}
    />
  );
};

export default DateRangeFilter;
