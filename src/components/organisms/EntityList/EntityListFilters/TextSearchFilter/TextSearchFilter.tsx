import {useContext, useEffect, useState} from 'react';
import {useDebounce} from 'react-use';

import {SearchOutlined} from '@ant-design/icons';
import {Input} from 'antd';

import {MainContext} from '@contexts';

import {FilterProps} from '@models/filters';

import {initialPageSize} from '@redux/initialState';

import Colors from '@styles/Colors';

const TextSearchFilter: React.FC<FilterProps> = props => {
  const {filters, setFilters, isFiltersDisabled} = props;

  const {dispatch} = useContext(MainContext);

  const [inputValue, setInputValue] = useState(filters.textSearch);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const [, cancel] = useDebounce(
    () => {
      dispatch(setFilters({...filters, textSearch: inputValue, pageSize: initialPageSize}));
    },
    300,
    [inputValue]
  );
  useEffect(cancel, []);

  useEffect(() => {
    setInputValue(filters.textSearch);
  }, [filters]);

  return (
    <Input
      prefix={<SearchOutlined style={{color: Colors.slate500}} />}
      placeholder="Search"
      onChange={onChange}
      value={inputValue}
      data-cy="search-filter"
      disabled={isFiltersDisabled}
    />
  );
};

export default TextSearchFilter;
