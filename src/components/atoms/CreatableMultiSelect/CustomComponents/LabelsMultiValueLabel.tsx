import {MultiValueGenericProps} from 'react-select';

import {SplitLabelText} from '@atoms';

import {Option} from '@models/form';

import {StyledMultiLabel} from '../CreatableMultiSelect.styled';

const LabelsMultiValueLabel = (props: MultiValueGenericProps<Option>) => {
  const {children} = props;

  return (
    <StyledMultiLabel data-test={`selected-label-${children}`}>
      {typeof children === 'string' ? <SplitLabelText value={children} textClassName="regular small" /> : null}
    </StyledMultiLabel>
  );
};

export default LabelsMultiValueLabel;
