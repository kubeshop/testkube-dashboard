import {useContext, useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';

import {Input} from 'antd';

import {SearchOutlined} from '@ant-design/icons';

import {FilterProps} from '@models/filters';

import useDebounce from '@hooks/useDebounce';

import Colors from '@styles/Colors';

import {MainContext} from '@contexts';

import {initialPageSize} from '@src/redux/initialState';

const TextSearchFilter: React.FC<FilterProps> = props => {
  const {filters, setFilters, entity, queryParam, isFiltersDisabled} = props;

  const {dispatch} = useContext(MainContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParamField = queryParam || 'textSearch';

  const [inputValue, setInputValue] = useState(filters[queryParamField]);

  const onChange = (e: any) => {
    setInputValue(e.target.value);
  };

  useDebounce(
    () => {
      const paramValue = {[queryParamField]: inputValue};

      dispatch(setFilters({...filters, ...paramValue, pageSize: initialPageSize}));

      if (inputValue) {
        searchParams.set(queryParamField, inputValue);
        setSearchParams(searchParams);
      } else {
        searchParams.delete(queryParamField);
        setSearchParams(searchParams);
      }
    },
    300,
    [inputValue]
  );

  useEffect(() => {
    setInputValue(filters[queryParamField]);
  }, [filters, entity]);

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
