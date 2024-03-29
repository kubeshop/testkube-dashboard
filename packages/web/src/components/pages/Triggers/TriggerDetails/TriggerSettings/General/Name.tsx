import {Form} from 'antd';

import {Input} from '@custom-antd';

import {CardForm} from '@organisms';

import {useTriggersPick} from '@store/triggers';

const Name: React.FC = () => {
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

export default Name;
