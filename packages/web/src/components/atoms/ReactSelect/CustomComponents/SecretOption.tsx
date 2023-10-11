import {OptionProps} from 'react-select';

import {SplitLabelText} from '@atoms';

import {Option} from '@models/form';

import {labelRegex} from '@molecules/LabelsSelect/utils';

import {StyledOption} from '../ReactSelect.styled';

const SecretOption = (props: OptionProps<Option>) => {
  // @ts-ignore
  const {children, innerRef, innerProps, value} = props;

  const isChildren = typeof children === 'string';
  const isKeyValuePair = labelRegex.test(value);

  return (
    // @ts-ignore
    <StyledOption ref={innerRef} {...innerProps} data-test={`secret-option-${children}`}>
      {isKeyValuePair && isChildren ? <SplitLabelText value={children} /> : children}
    </StyledOption>
  );
};

export default SecretOption;
