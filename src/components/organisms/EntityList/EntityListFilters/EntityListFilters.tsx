import {FC, memo} from 'react';

import useIsMobile from '@hooks/useIsMobile';

import {FilterProps} from '@models/filters';

import {FiltersContainer} from './EntityDetailsFilters.styled';
import LabelsFilter from './LabelsFilter';
import StatusFilter from './StatusFilter';
import TextSearchFilter from './TextSearchFilter';

const EntityListFilters: FC<FilterProps> = props => {
  const {isFiltersDisabled, ...rest} = props;

  const isMobile = useIsMobile();

  const filtersWidth = isMobile ? 'inherit' : '296px';

  const commonFiltersProps = {
    isFiltersDisabled,
    width: filtersWidth,
  };

  return (
    <FiltersContainer isMobile={isMobile}>
      <TextSearchFilter {...rest} {...commonFiltersProps} />
      <LabelsFilter {...rest} {...commonFiltersProps} />
      <StatusFilter {...rest} {...commonFiltersProps} />
    </FiltersContainer>
  );
};

export default memo(EntityListFilters);
