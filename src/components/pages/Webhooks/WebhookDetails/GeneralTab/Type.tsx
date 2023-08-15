import {FC} from 'react';

import {Form, Select} from 'antd';

import {FormItem} from '@custom-antd';

import {ConfigurationCard} from '@molecules';

import {requiredNoText} from '@utils/form';

type TypeFormValues = {
  name: string;
};

const Type: FC = () => {
  const [form] = Form.useForm<TypeFormValues>();

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={{
        type: 'webhook',
      }}
    >
      <ConfigurationCard title="Notification type" description="Define the type of notification">
        <FormItem name="type" label="Type" required rules={[requiredNoText]}>
          <Select disabled>
            <Select.Option value="webhook">Webhook</Select.Option>
          </Select>
        </FormItem>
      </ConfigurationCard>
    </Form>
  );
};

export default Type;
