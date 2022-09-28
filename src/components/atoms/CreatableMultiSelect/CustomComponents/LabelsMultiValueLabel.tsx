import {MultiValueGenericProps} from 'react-select';

import {Option} from '@models/form';

import {StyledMultiLabel} from '../CreatableMultiSelect.styled';
import {SplittedLabel} from '../utils';

const LabelsMultiValueLabel = (props: MultiValueGenericProps<Option>) => {
  const {children} = props;

  return (
    <StyledMultiLabel>
      <SplittedLabel value={String(children)} textClassName="regular small" />
    </StyledMultiLabel>
  );
};

export default LabelsMultiValueLabel;
