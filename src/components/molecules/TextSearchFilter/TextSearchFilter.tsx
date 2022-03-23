import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useDebounce} from 'react-use';

import {DashboardBlueprintType} from '@models/dashboard';
import {FilterProps} from '@models/filters';

import {StyledSearchInput, StyledSearchInputContainer} from './TextSearchFilter.styled';

const inputValueQueryParams: {[key in DashboardBlueprintType]: string} = {
  'test-suites': 'textSearch',
  tests: 'textSearch',
};
const TextSearchFilter: React.FC<FilterProps> = props => {
  const {filters, setSelectedRecord, setFilters, entityType, queryParam} = props;

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

  return (
    <StyledSearchInputContainer>
      <StyledSearchInput placeholder="Search" onChange={onChange} value={inputValue} />
    </StyledSearchInputContainer>
  );
};

export default TextSearchFilter;
