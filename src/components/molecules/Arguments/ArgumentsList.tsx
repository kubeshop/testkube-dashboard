import {Form, FormInstance} from 'antd';

import {Variable} from '@models/variable';

import ArgumentsForm from './ArgumentsForm';

type ArgumentsListProps = {
  data: Variable[];
  form: FormInstance;
  onFinish: (values: any) => void;
};

const ArgumentsList: React.FC<ArgumentsListProps> = props => {
  const {data, form, onFinish} = props;

  return (
    <Form
      form={form}
      onFinish={onFinish}
      onFieldsChange={(_, allFields) => {
        form.setFieldsValue(allFields);
      }}
    >
      <ArgumentsForm data={data} form={form} />
    </Form>
  );
};

export default ArgumentsList;
