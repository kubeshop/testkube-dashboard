import {useContext, useEffect, useState} from 'react';

import {DashboardBlueprintType} from '@models/dashboard';
import {FilterProps} from '@models/filters';

import {LabelInput} from '@atoms';

import useDebounce from '@hooks/useDebounce';

import {MainContext} from '@contexts';

const inputValueQueryParams: {[key in DashboardBlueprintType]: string} = {
  'test-suites': 'textSearch',
  tests: 'textSearch',
};

const placeholders: {[key in DashboardBlueprintType]: string} = {
  'test-suites': 'Test suite',
  tests: 'Test',
};

const TextFilter: React.FC<FilterProps> = props => {
  const {filters, setSelectedRecord, setFilters, entityType, queryParam, placeholderText} = props;

  const queryParamField = queryParam || inputValueQueryParams[entityType];

  const {dispatch} = useContext(MainContext);

  const [inputValue, setInputValue] = useState(filters[queryParam || queryParamField]);

  const onChange = (e: any) => {
    dispatch(setSelectedRecord({selectedRecord: null}));

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

  const placeholder = placeholderText || `${placeholders[entityType]} name`;

  return <LabelInput placeholder={placeholder} value={inputValue} onChange={onChange} />;
};

export default TextFilter;
