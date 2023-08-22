import {FC, useContext, useEffect, useState} from 'react';

import {Form} from 'antd';

import {FormItem} from '@custom-antd';

import {ConfigurationCard, notificationCall} from '@molecules';
import KubernetesResourceEditor from '@molecules/KubernetesResourceEditor';

import {useUpdateWebhookMutation} from '@services/webhooks';

import WebhookDetailsContext from '../WebhookDetailsContext';

type CustomPayloadFormValues = {
  payloadTemplate: string;
};

const CustomPayload: FC = () => {
  const [form] = Form.useForm<CustomPayloadFormValues>();

  const {webhookDetails, setWebhookDetails} = useContext(WebhookDetailsContext);

  const [value, setValue] = useState(webhookDetails?.payloadTemplate || '');

  const [updateWebhook] = useUpdateWebhookMutation();

  const onFinish = () => {
    const values: CustomPayloadFormValues = form.getFieldsValue();

    const newWebhook = {
      ...webhookDetails!,
      ...values,
    };

    updateWebhook(newWebhook).then(() => {
      notificationCall('passed', 'The custom payload was successfully updated.');
      setWebhookDetails(newWebhook);
      form.resetFields();
    });
  };

  useEffect(() => {
    setValue(webhookDetails?.payloadTemplate || '');
    form.setFieldValue('payloadTemplate', webhookDetails?.payloadTemplate);
  }, [webhookDetails]);

  return (
    <Form
      name="webhook-payload-template-form"
      form={form}
      initialValues={{
        payloadTemplate: webhookDetails?.payloadTemplate,
      }}
      onFinish={onFinish}
    >
      <ConfigurationCard
        title="Custom payload"
        description="Customize the payload we will send with each request."
        onCancel={form.resetFields}
      >
        <FormItem name="payloadTemplate">
          <KubernetesResourceEditor value={value} onChange={setValue} />
        </FormItem>
      </ConfigurationCard>
    </Form>
  );
};

export default CustomPayload;
