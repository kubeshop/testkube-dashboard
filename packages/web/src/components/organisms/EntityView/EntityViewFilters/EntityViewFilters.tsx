import {FC, memo} from 'react';

import {EntityFilters} from '@models/entity';

import * as S from './EntityViewFilters.styled';
import LabelsFilter from './LabelsFilter';
import StatusFilter from './StatusFilter';
import TextSearchFilter from './TextSearchFilter';

const EntityViewFilters: FC<EntityFilters> = props => {
  const {disabled, ...rest} = props;

  return (
    <S.FiltersContainer>
      <TextSearchFilter {...rest} disabled={disabled} />
      <LabelsFilter {...rest} disabled={disabled} />
      <StatusFilter {...rest} disabled={disabled} />
    </S.FiltersContainer>
  );
};

export default memo(EntityViewFilters);
