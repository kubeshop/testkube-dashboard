import {memo, useEffect} from 'react';

import {Form} from 'antd';

import {Variable} from '@models/variable';

import VariablesFormList from '../../../VariablesFormList';

type VariablesListProps = {
  data: Variable[];
  onClickSave: (value: any) => void;
};

const VariablesList: React.FC<VariablesListProps> = props => {
  const {data, onClickSave} = props;

  const [form] = Form.useForm();

  const onFinish = (value: any) => {
    onClickSave(value);
  };

  useEffect(() => {
    form.setFieldsValue({
      'variables-list': data,
    });
  }, [data]);

  return (
    <Form
      form={form}
      onFinish={onFinish}
      onFieldsChange={(_, allFields) => {
        form.setFieldsValue(allFields);
      }}
    >
      <VariablesFormList data={data} form={form} />
    </Form>
  );
};

const arePropsEqual = (prevProps: VariablesListProps, nextProps: VariablesListProps) => {
  return JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data);
};

export default memo(VariablesList, arePropsEqual);
