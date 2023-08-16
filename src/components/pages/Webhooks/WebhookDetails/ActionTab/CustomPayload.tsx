import {FC, useContext, useEffect, useState} from 'react';

import {Form} from 'antd';

import {ConfigurationCard} from '@molecules';
import KubernetesResourceEditor from '@molecules/KubernetesResourceEditor';

import WebhookDetailsContext from '../WebhookDetailsContext';

type CustomPayloadFormValues = {
  payloadTemplate: string;
};

const CustomPayload: FC = () => {
  const [form] = Form.useForm<CustomPayloadFormValues>();

  const {webhookDetails} = useContext(WebhookDetailsContext);

  const [value, setValue] = useState(webhookDetails?.payloadTemplate || '');

  useEffect(() => {
    setValue(webhookDetails?.payloadTemplate || '');
  }, [webhookDetails]);

  return (
    <Form name="webhook-payload-template-form" form={form}>
      <ConfigurationCard title="Custom payload" description="Customize the payload we will send with each request.">
        <KubernetesResourceEditor value={value} onChange={setValue} />
      </ConfigurationCard>
    </Form>
  );
};

export default CustomPayload;
