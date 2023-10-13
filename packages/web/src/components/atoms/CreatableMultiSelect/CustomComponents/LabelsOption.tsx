import {OptionProps} from 'react-select';

import {Tooltip} from 'antd';

import {SplitLabelText} from '@atoms';

import {Option} from '@models/form';

import {labelRegex} from '@molecules/LabelsSelect/utils';

import {StyledOption} from '../CreatableMultiSelect.styled';

const LabelsOption = (props: OptionProps<Option>) => {
  // @ts-ignore
  const {children, innerRef, innerProps, isDisabled, value} = props;

  const isChildren = typeof children === 'string';
  const allowClick = labelRegex.test(value);

  const option =
    allowClick && isChildren ? (
      // @ts-ignore
      <StyledOption ref={innerRef} {...innerProps} $disabled={isDisabled} data-test={`label-option-${children}`}>
        <SplitLabelText value={children} disabled={isDisabled} />
      </StyledOption>
    ) : (
      // @ts-ignore
      <StyledOption ref={innerRef} $disabled={isDisabled}>
        {children}
      </StyledOption>
    );

  return isDisabled ? <Tooltip title="There may be only single value for a key selected.">{option}</Tooltip> : option;
};

export default LabelsOption;
