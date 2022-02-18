import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useDebounce} from 'react-use';

import {DashboardBlueprintType} from '@models/dashboard';
import {FilterProps} from '@models/filters';

import {LabelInput} from '@atoms';

const inputValueQueryParams: {[key in DashboardBlueprintType]: string} = {
  'test-suites': 'textSearch',
  'test-suite-executions': 'textSearch',
  tests: 'textSearch',
  executions: 'testName',
};

const placeholders: {[key in DashboardBlueprintType]: string} = {
  'test-suites': 'Test suite',
  'test-suite-executions': 'Test suite execution',
  tests: 'Test',
  executions: 'Test',
};

const TextFilter: React.FC<FilterProps> = props => {
  const {filters, setSelectedRecord, setFilters, entityType, queryParam, placeholderText} = props;

  const queryParamField = queryParam || inputValueQueryParams[entityType];

  const dispatch = useDispatch();

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
