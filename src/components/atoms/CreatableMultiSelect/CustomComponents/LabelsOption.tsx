import {OptionProps} from 'react-select';

import {Option} from '@models/form';

import {SplitLabelText} from '@atoms';

import {Text} from '@custom-antd';

import Colors from '@styles/Colors';

import {StyledOption} from '../CreatableMultiSelect.styled';

const LabelsOption = (props: OptionProps<Option>) => {
  // @ts-ignore
  const {children, innerRef, innerProps, options, value} = props;

  const isChildren = typeof children === 'string';
  const isCreateOption = options[0].label === children && children !== value;

  const allowClick =
    isChildren && isCreateOption
      ? Boolean(
          children.match(
            /(Create (([A-Za-z0-9][-A-Za-z0-9_./]*)?[A-Za-z0-9]:\s?(([A-Za-z0-9][-A-Za-z0-9_.]*)?[A-Za-z0-9])?))/g
          )
        )
      : true;

  const modifyChildren = () => {
    if (!isChildren) {
      return children;
    }

    if (isCreateOption) {
      return (
        <Text color={Colors.slate100} className="regular">
          {children}
        </Text>
      );
    }

    if (children.includes(':')) {
      return <SplitLabelText value={children} />;
    }

    return (
      <Text color={Colors.slate200} className="regular">
        {children}
      </Text>
    );
  };

  if (allowClick) {
    return (
      // @ts-ignore
      <StyledOption ref={innerRef} {...innerProps} data-test={`label-option-${children}`}>
        {modifyChildren()}
      </StyledOption>
    );
  }

  return (
    // @ts-ignore
    <StyledOption ref={innerRef}>{modifyChildren()}</StyledOption>
  );
};

export default LabelsOption;
