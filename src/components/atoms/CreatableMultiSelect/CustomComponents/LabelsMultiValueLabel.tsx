import {MultiValueGenericProps} from 'react-select';

import {StyledMultiLabel} from '@atoms/CreatableMultiSelect.styled';
import {SplitLabelText} from '@atoms/SplitLabelText';

import type {Option} from '@models/form';

export const LabelsMultiValueLabel = (props: MultiValueGenericProps<Option>) => {
  const {children} = props;

  return (
    <StyledMultiLabel data-test={`selected-label-${children}`}>
      {typeof children === 'string' ? <SplitLabelText value={children} textClassName="regular small" /> : null}
    </StyledMultiLabel>
  );
};
