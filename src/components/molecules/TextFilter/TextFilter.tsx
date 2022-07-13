import {useContext, useEffect, useState} from 'react';

import {FilterProps} from '@models/filters';

import {LabelInput} from '@atoms';

import useDebounce from '@hooks/useDebounce';

import {MainContext} from '@contexts';

import {Entity} from '@src/models/entity';

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
      dispatch(setFilters({...filters, page: 0, [queryParam || queryParamField]: inputValue}));
    },
    300,
    [inputValue]
  );

  useEffect(() => {
    setInputValue(filters[queryParamField]);
  }, [filters]);

  const placeholder = placeholderText || `${placeholders[entity]} name`;

  return <LabelInput placeholder={placeholder} value={inputValue} onChange={onChange} />;
};

export default TextFilter;
