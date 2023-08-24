import {FC} from 'react';

import {FormItemProps} from 'antd';

import {StyledFormItem, StyledFormItemLabel} from '@custom-antd/Form.styled';

type FormItemCustomProps = {
  flex?: number | string;
};

export const FormItem: FC<FormItemProps & FormItemCustomProps> = props => {
  const {children, label, flex = 1, ...rest} = props;

  const formItemsProps: FormItemProps & {$flex: number | string} = {
    ...(label ? {label: <StyledFormItemLabel>{label}</StyledFormItemLabel>} : {}),
    ...rest,
    $flex: flex,
  };

  return <StyledFormItem {...formItemsProps}>{children}</StyledFormItem>;
};
