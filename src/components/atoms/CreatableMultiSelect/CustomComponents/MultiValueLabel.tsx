import {MultiValueGenericProps} from 'react-select';

import {Option} from '@models/form';

import {StyledMultiLabel} from '../CreatableMultiSelect.styled';
import {SplittedLabel} from '../utils';

const MultiValueLabel = (props: MultiValueGenericProps<Option>) => {
  const {children} = props;

  return (
    <StyledMultiLabel>
      <SplittedLabel value={String(children)} />
    </StyledMultiLabel>
  );
};

export default MultiValueLabel;
