import {FC} from 'react';

import {Form} from 'antd';

import {Input} from '@custom-antd/Input';

import {CardForm} from '@organisms/CardForm';

import {useTriggersPick} from '@store/triggers';

export const Name: FC = () => {
  const {current} = useTriggersPick('current');

  const [form] = Form.useForm();

  return (
    <CardForm
      name="general-settings-name"
      title="Trigger name"
      description="Define the name of your trigger"
      form={form}
      initialValues={{name: current?.name}}
      readOnly
    >
      <Form.Item label="Name" name="name">
        <Input placeholder="e.g.: my-test-trigger" disabled />
      </Form.Item>
    </CardForm>
  );
};
