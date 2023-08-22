import React from 'react';

import {Form} from 'antd';

import {Input} from '@custom-antd';

import {CardForm} from '@organisms';

import {useExecutorsPick} from '@store/executors';

type NameNTypeFormValues = {
  name: string;
  type: string;
};

const NameNType: React.FC = () => {
  const [form] = Form.useForm<NameNTypeFormValues>();
  const {current} = useExecutorsPick('current');
  const {name} = current!;
  const type = current!.executor.types?.[0] ?? '';

  return (
    <CardForm
      name="general-settings-name-type"
      title="Executor name & type"
      description="Define the name and type of the executor which will be displayed across the Dashboard and CLI"
      form={form}
      initialValues={{name, type}}
      readOnly
    >
      <Form.Item label="Name" name="name">
        <Input placeholder="e.g.: my-container-executor" disabled />
      </Form.Item>
      <Form.Item label="Type" name="type" style={{flex: 1, marginBottom: '0'}}>
        <Input placeholder="e.g.: my-executor/type" disabled />
      </Form.Item>
    </CardForm>
  );
};

export default NameNType;
