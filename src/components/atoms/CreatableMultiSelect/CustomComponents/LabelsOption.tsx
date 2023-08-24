import {OptionProps} from 'react-select';

import {StyledOption} from '@atoms/CreatableMultiSelect.styled';
import {SplitLabelText} from '@atoms/SplitLabelText';

import type {Option} from '@models/form';

import {labelRegex} from '@molecules/LabelsSelect/utils';

export const LabelsOption = (props: OptionProps<Option>) => {
  // @ts-ignore
  const {children, innerRef, innerProps, value} = props;

  const isChildren = typeof children === 'string';
  const allowClick = labelRegex.test(value);

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
