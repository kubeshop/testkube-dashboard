import {useContext, useEffect, useState} from 'react';

import {FilterProps} from '@models/filters';

import useDebounce from '@hooks/useDebounce';

import {MainContext} from '@contexts';

import {Entity} from '@src/models/entity';

import {StyledSearchInput, StyledSearchInputContainer} from './TextSearchFilter.styled';

const inputValueQueryParams: {[key in Entity]: string} = {
  'test-suites': 'textSearch',
  tests: 'textSearch',
};
const TextSearchFilter: React.FC<FilterProps> = props => {
  const {filters, setFilters, entity, queryParam, isFiltersDisabled} = props;

  const {dispatch} = useContext(MainContext);

  const queryParamField = queryParam || inputValueQueryParams[entity];

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

  return (
    <StyledSearchInputContainer>
      <StyledSearchInput
        placeholder="Search"
        onChange={onChange}
        value={inputValue}
        data-cy="search-filter"
        disabled={isFiltersDisabled}
      />
    </StyledSearchInputContainer>
  );
};

export default TextSearchFilter;
