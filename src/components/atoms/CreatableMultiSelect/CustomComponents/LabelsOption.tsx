import {OptionProps} from 'react-select';

import {SplitLabelText} from '@atoms';

import {Option} from '@models/form';

import {labelRegex} from '@molecules/LabelsSelect/utils';

import {StyledOption} from '../CreatableMultiSelect.styled';

const LabelsOption = (props: OptionProps<Option>) => {
  // @ts-ignore
  const {children, innerRef, innerProps, value} = props;

  const isChildren = typeof children === 'string';
  const allowClick = value.match(labelRegex);

  if (allowClick && isChildren) {
    return (
      // @ts-ignore
      <StyledOption ref={innerRef} {...innerProps} data-test={`label-option-${children}`}>
        <SplitLabelText value={children} />
      </StyledOption>
    );
  }

  return (
    // @ts-ignore
    <StyledOption ref={innerRef}>{children}</StyledOption>
  );
};

export default LabelsOption;
