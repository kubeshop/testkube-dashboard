import {Form, FormItemProps} from 'antd';

import {StyledFormItemLabel} from '../Form.styled';

const {Item: AntdFormItem} = Form;

const FormItem: React.FC<FormItemProps> = props => {
  const {children, label, ...rest} = props;

  const formItemsProps: FormItemProps = {
    label: label ? <StyledFormItemLabel>{label}</StyledFormItemLabel> : {},
    ...rest,
  };

  return <AntdFormItem {...formItemsProps}>{children}</AntdFormItem>;
};

export default FormItem;
