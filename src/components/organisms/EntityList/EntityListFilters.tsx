import {FC, memo} from 'react';

import type {FilterProps} from '@models/filters';

import {FiltersContainer} from './EntityListFilters.styled';
import {LabelsFilter} from './EntityListFilters/LabelsFilter';
import {StatusFilter} from './EntityListFilters/StatusFilter';
import {TextSearchFilter} from './EntityListFilters/TextSearchFilter';

export const EntityListFilters: FC<FilterProps> = memo(props => {
  const {isFiltersDisabled, ...rest} = props;

  return (
    <FiltersContainer>
      <TextSearchFilter {...rest} isFiltersDisabled={isFiltersDisabled} />
      <LabelsFilter {...rest} isFiltersDisabled={isFiltersDisabled} />
      <StatusFilter {...rest} isFiltersDisabled={isFiltersDisabled} />
    </FiltersContainer>
  );
});
