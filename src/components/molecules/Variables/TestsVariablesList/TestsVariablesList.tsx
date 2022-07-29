import {memo, useEffect} from 'react';

import {Form, FormInstance} from 'antd';

import {Variable} from '@models/variable';

import VariablesFormList from '../../VariablesFormList';

type VariablesListProps = {
  data: Variable[];
  form: FormInstance;
  onFinish: (values: any) => void;
};

const VariablesList: React.FC<VariablesListProps> = props => {
  const {data, form, onFinish} = props;

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
