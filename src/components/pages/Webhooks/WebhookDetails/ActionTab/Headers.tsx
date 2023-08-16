import {FC, useContext, useEffect} from 'react';

import {Form} from 'antd';

import {Webhook} from '@models/webhook';

import {ConfigurationCard} from '@molecules';

import WebhookDetailsContext from '../WebhookDetailsContext';

type HeadersFormValues = {
  headers: Webhook['headers'];
};

const Headers: FC = () => {
  const {webhookDetails} = useContext(WebhookDetailsContext);

  const [form] = Form.useForm<HeadersFormValues>();

  useEffect(() => {
    form.setFieldValue('headers', webhookDetails?.headers);
  }, [webhookDetails]);

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={{
        headers: webhookDetails?.headers ?? {},
      }}
    >
      <ConfigurationCard title="Headers" description="Customize the headers we will send with each request.">
        <div>Headers form</div>
      </ConfigurationCard>
    </Form>
  );
};

export default Headers;
