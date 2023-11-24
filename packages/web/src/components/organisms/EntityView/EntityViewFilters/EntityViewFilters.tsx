import {FC, memo} from 'react';

import {EntityFilters} from '@models/entity';

import {useTestsSlot} from '@plugins/tests-and-test-suites/hooks';

import * as S from './EntityViewFilters.styled';
import LabelsFilter from './LabelsFilter';
import StatusFilter from './StatusFilter';
import TextSearchFilter from './TextSearchFilter';

const EntityViewFilters: FC<EntityFilters> = props => {
  const {disabled, ...rest} = props;

  const switchComponent = useTestsSlot('entityViewSwitch');

  return (
    <S.FiltersContainer>
      <TextSearchFilter {...rest} disabled={disabled} />
      <LabelsFilter {...rest} disabled={disabled} />
      <StatusFilter {...rest} disabled={disabled} />
      {switchComponent || null}
    </S.FiltersContainer>
  );
};

export default memo(EntityViewFilters);
