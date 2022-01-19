import {useDispatch} from 'react-redux';

import {DatePicker} from 'antd';

import moment from 'moment';

import {FilterProps} from '@models/filters';

const datePickerStyles = {
  color: 'var(--color-dark-quaternary)',
  backgroundColor: 'var(--color-dark-primary)',
  border: '1px solid var(--color-dark-quaternary)',
  width: '250px',
  height: '36px',
};

const DateFilter: React.FC<FilterProps> = props => {
  const {setFilters, filters} = props;

  const dispatch = useDispatch();

  const onDateChange = (_: any, dateString: any) => {
    if (!dateString) {
      dispatch(setFilters({...filters, createdAt: null}));
    } else {
      dispatch(setFilters({...filters, page: 0, createdAt: dateString}));
    }
  };

  return (
    <DatePicker
      placeholder="Select date"
      style={datePickerStyles}
      format="YYYY-MM-DD"
      onChange={onDateChange}
      value={filters?.createdAt && moment(filters?.createdAt)}
    />
  );
};

export default DateFilter;
