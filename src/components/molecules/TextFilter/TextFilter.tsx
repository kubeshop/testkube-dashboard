import {useContext, useEffect, useState} from 'react';
import {useDebounce} from 'react-use';

import {MainContext} from '@contexts';

import {Input} from '@custom-antd';

import {Entity} from '@models/entity';
import {FilterProps} from '@models/filters';

const inputValueQueryParams: Record<Entity, string> = {
  'test-suites': 'textSearch',
  tests: 'textSearch',
};

const placeholders: Record<Entity, string> = {
  'test-suites': 'Test suite',
  tests: 'Test',
};

const TextFilter: React.FC<FilterProps> = props => {
  const {filters, setFilters, entity, queryParam, placeholderText} = props;

  const queryParamField = queryParam || inputValueQueryParams[entity];

  const {dispatch} = useContext(MainContext);

  const [inputValue, setInputValue] = useState(filters[queryParam || queryParamField]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
