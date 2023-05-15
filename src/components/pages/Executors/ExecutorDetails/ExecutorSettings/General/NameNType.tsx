import React, {useEffect} from 'react';

import {Form} from 'antd';

import {useAppSelector} from '@redux/hooks';
import {selectCurrentExecutor} from '@redux/reducers/executorsSlice';

import {Input} from '@custom-antd';

import {ConfigurationCard} from '@molecules';

type NameNTypeFormValues = {
  name: string;
  type: string;
};

const NameNType: React.FC = () => {
  const [form] = Form.useForm<NameNTypeFormValues>();

  const {name, executor} = useAppSelector(selectCurrentExecutor);
  const type = executor?.types?.[0] ?? '';

  useEffect(() => {
    form.setFieldsValue({
      name,
      type,
    });
  }, [name, type]);

  return (
    <Form
      form={form}
      name="general-settings-name-type"
      initialValues={{name, type}}
      layout="vertical"
      disabled
    >
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
        enabled={false}
        isEditable={false}
      >
        <Form.Item label="Name" name="name">
          <Input placeholder="e.g.: my-container-executor" disabled />
        </Form.Item>
        <Form.Item label="Type" name="type" style={{flex: 1, marginBottom: '0'}}>
          <Input placeholder="e.g.: my-executor/type" disabled />
        </Form.Item>
      </ConfigurationCard>
    </Form>
  );
};

export default NameNType;
