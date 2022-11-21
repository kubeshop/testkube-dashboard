import {useContext, useEffect, useState} from 'react';

import {Input} from 'antd';

import {SearchOutlined} from '@ant-design/icons';

import {FilterProps} from '@models/filters';

import useDebounce from '@hooks/useDebounce';

import Colors from '@styles/Colors';

import {MainContext} from '@contexts';

const TextSearchFilter: React.FC<FilterProps> = props => {
  const {filters, setFilters, entity, queryParam, isFiltersDisabled} = props;

  const {dispatch} = useContext(MainContext);

  const queryParamField = queryParam || 'textSearch';

  const [inputValue, setInputValue] = useState(filters[queryParam || queryParamField]);

  const onChange = (e: any) => {
    setInputValue(e.target.value);
  };

  useDebounce(
    () => {
      dispatch(setFilters({...filters, [queryParam || queryParamField]: inputValue}));
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
