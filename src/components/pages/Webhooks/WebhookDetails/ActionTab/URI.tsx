import {FC, useContext, useEffect} from 'react';

import {Form, Input} from 'antd';

import {FormItem} from '@custom-antd';

import {ConfigurationCard, notificationCall} from '@molecules';

import {useUpdateWebhookMutation} from '@services/webhooks';

import {requiredNoText, url} from '@utils/form';

import WebhookDetailsContext from '../WebhookDetailsContext';

type URIFormValues = {
  name: string;
};

const URI: FC = () => {
  const [form] = Form.useForm<URIFormValues>();

  const {webhookDetails, setWebhookDetails} = useContext(WebhookDetailsContext);

  const [updateWebhook] = useUpdateWebhookMutation();

  const onFinish = () => {
    const values: URIFormValues = form.getFieldsValue();

    const newWebhook = {
      ...webhookDetails!,
      ...values,
    };

    updateWebhook(newWebhook).then(() => {
      notificationCall('passed', 'The URI was successfully updated.');
      setWebhookDetails(newWebhook);
      form.resetFields();
    });
  };

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
        onConfirm={onFinish}
        onCancel={form.resetFields}
      >
        <FormItem name="uri" label="URI" required rules={[requiredNoText, url]}>
          <Input placeholder="URI" />
        </FormItem>
      </ConfigurationCard>
    </Form>
  );
};

export default URI;
