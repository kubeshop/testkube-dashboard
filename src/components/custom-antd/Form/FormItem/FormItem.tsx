import {FormItemProps} from 'antd';

import {StyledFormItem, StyledFormItemLabel} from '../Form.styled';

type FormItemCustomProps = {
  flex?: number | string;
};

const FormItem: React.FC<FormItemProps & FormItemCustomProps> = props => {
  const {children, label, flex = 1, ...rest} = props;

  const formItemsProps: FormItemProps & {$flexGrow?: number | string} = {
    ...(label ? {label: <StyledFormItemLabel>{label}</StyledFormItemLabel>} : {}),
    ...rest,
    $flexGrow: flex,
  };

  return <StyledFormItem {...formItemsProps}>{children}</StyledFormItem>;
};

export default FormItem;
