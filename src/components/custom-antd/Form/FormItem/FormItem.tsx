import {FormItemProps} from 'antd';

import {StyledFormItem, StyledFormItemLabel} from '../Form.styled';

const FormItem: React.FC<FormItemProps> = props => {
  const {children, label, ...rest} = props;

  const formItemsProps: FormItemProps = {
    ...(label ? {label: <StyledFormItemLabel>{label}</StyledFormItemLabel>} : {}),
    ...rest,
  };

  return <StyledFormItem {...formItemsProps}>{children}</StyledFormItem>;
};

export default FormItem;
