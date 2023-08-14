import {FC, memo} from 'react';

import {FilterProps} from '@models/filters';

import {FiltersContainer} from './EntityListFilters.styled';
import LabelsFilter from './LabelsFilter';
import StatusFilter from './StatusFilter';
import TextSearchFilter from './TextSearchFilter';

const EntityListFilters: FC<FilterProps> = props => {
  const {isFiltersDisabled, ...rest} = props;

  return (
    <FiltersContainer>
      <TextSearchFilter {...rest} isFiltersDisabled={isFiltersDisabled} />
      <LabelsFilter {...rest} isFiltersDisabled={isFiltersDisabled} />
      <StatusFilter {...rest} isFiltersDisabled={isFiltersDisabled} />
    </FiltersContainer>
  );
};

export default memo(EntityListFilters);
