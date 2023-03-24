import {useContext, useEffect, useState} from 'react';
import {useDebounce} from 'react-use';

import {Entity} from '@models/entity';
import {FilterProps} from '@models/filters';

import {Input} from '@custom-antd';

import {MainContext} from '@contexts';

const inputValueQueryParams: {[key in Entity]: string} = {
  'test-suites': 'textSearch',
  tests: 'textSearch',
};

const placeholders: {[key in Entity]: string} = {
  'test-suites': 'Test suite',
  tests: 'Test',
};

const TextFilter: React.FC<FilterProps> = props => {
  const {filters, setFilters, entity, queryParam, placeholderText} = props;

  const queryParamField = queryParam || inputValueQueryParams[entity];

  const {dispatch} = useContext(MainContext);

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
  }, [filters]);

  const placeholder = placeholderText || `${placeholders[entity]} name`;

  return <Input placeholder={placeholder} value={inputValue} onChange={onChange} />;
};

export default TextFilter;
