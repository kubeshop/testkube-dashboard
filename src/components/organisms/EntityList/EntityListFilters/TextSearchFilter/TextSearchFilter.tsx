import {useContext, useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
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
  const [searchParams, setSearchParams] = useSearchParams();

  const [inputValue, setInputValue] = useState(filters.textSearch);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useDebounce(
    () => {
      const paramValue = {textSearch: inputValue};

      dispatch(setFilters({...filters, ...paramValue, pageSize: initialPageSize}));

      if (inputValue) {
        searchParams.set('textSearch', inputValue);
        setSearchParams(searchParams);
      } else {
        searchParams.delete('textSearch');
        setSearchParams(searchParams);
      }
    },
    300,
    [inputValue]
  );

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
      style={{width: '296px'}}
    />
  );
};

export default TextSearchFilter;
