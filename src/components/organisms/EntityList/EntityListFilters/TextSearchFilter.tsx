import {ChangeEvent, FC, useEffect, useState} from 'react';
import {useDebounce} from 'react-use';

import {SearchOutlined} from '@ant-design/icons';
import {Input} from 'antd';

import type {FilterProps} from '@models/filters';

import {initialPageSize} from '@redux/initialState';

import {Colors} from '@styles/Colors';

export const TextSearchFilter: FC<FilterProps> = props => {
  const {filters, setFilters, isFiltersDisabled} = props;

  const [inputValue, setInputValue] = useState(filters.textSearch);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const [, cancel] = useDebounce(
    () => {
      setFilters({...filters, textSearch: inputValue, pageSize: initialPageSize});
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
