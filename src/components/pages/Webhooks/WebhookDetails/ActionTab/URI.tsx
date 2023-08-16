import {FC, useContext, useEffect} from 'react';

import {Form, Input} from 'antd';

import {FormItem} from '@custom-antd';

import {ConfigurationCard} from '@molecules';

import {requiredNoText, url} from '@utils/form';

import WebhookDetailsContext from '../WebhookDetailsContext';

type URIFormValues = {
  name: string;
};

const URI: FC = () => {
  const {webhookDetails} = useContext(WebhookDetailsContext);

  const [form] = Form.useForm<URIFormValues>();

  useEffect(() => {
    form.setFieldValue('uri', webhookDetails?.uri);
  }, [webhookDetails]);

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={{
        uri: webhookDetails?.uri ?? '',
      }}
    >
      <ConfigurationCard
        title="Endpoint URI"
        description="Define the target URI which we will call with this notification."
      >
        <FormItem name="uri" label="URI" required rules={[requiredNoText, url]}>
          <Input placeholder="URI" />
        </FormItem>
      </ConfigurationCard>
    </Form>
  );
};

export default URI;
