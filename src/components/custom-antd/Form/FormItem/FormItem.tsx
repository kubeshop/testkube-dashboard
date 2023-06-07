import {FormItemProps} from 'antd';

import {StyledFormItem, StyledFormItemLabel} from '../Form.styled';

type FormItemCustomProps = {
  flex?: number;
};

const FormItem: React.FC<FormItemProps & FormItemCustomProps> = props => {
  const {children, label, flex = 1, ...rest} = props;

  const formItemsProps: FormItemProps & FormItemCustomProps = {
    ...(label ? {label: <StyledFormItemLabel>{label}</StyledFormItemLabel>} : {}),
    flex,
    ...rest,
  };

  return <StyledFormItem {...formItemsProps}>{children}</StyledFormItem>;
};

export default FormItem;
