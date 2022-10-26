import {useEffect} from 'react';

import {Form} from 'antd';

import {useAppSelector} from '@redux/hooks';
import {selectCurrentExecutor} from '@redux/reducers/executorsSlice';

import {Input} from '@custom-antd';

import {ConfigurationCard} from '@molecules';

import {required} from '@utils/form';

const Delete: React.FC = () => {
  const {name, executor} = useAppSelector(selectCurrentExecutor);

  const {types} = executor;
  const type = types[0];

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      name,
      type,
    });
  }, [name, type]);

  return (
    <Form form={form} name="general-settings-name-type" initialValues={{name, type}} layout="vertical">
      <ConfigurationCard
        title="Executor name & type"
        description="Define the name and type of the executor which will be displayed across the Dashboard and CLI"
        onConfirm={() => {
          form.submit();
        }}
        onCancel={() => {
          form.resetFields();
        }}
        isButtonsDisabled
      >
        <Form.Item label="Name" required name="name" rules={[required]}>
          <Input placeholder="e.g.: my-container-executor" disabled />
        </Form.Item>
        <Form.Item label="Type" required name="type" rules={[required]}>
          <Input placeholder="e.g.: my-executor/type" disabled />
        </Form.Item>
      </ConfigurationCard>
    </Form>
  );
};

export default Delete;
