import {FC, useContext, useEffect} from 'react';

import {Form, Input} from 'antd';

import {ExternalLink} from '@atoms';

import {FormItem} from '@custom-antd';

import {ConfigurationCard} from '@molecules';

import {useUpdateWebhookMutation} from '@services/webhooks';

import {externalLinks} from '@utils/externalLinks';
import {requiredNoText} from '@utils/form';

import WebhookDetailsContext from '../WebhookDetailsContext';

type NameFormValues = {
  name: string;
};

const Name: FC = () => {
  const [form] = Form.useForm<NameFormValues>();

  const {webhookDetails, setWebhookDetails} = useContext(WebhookDetailsContext);

  const [updateWebhook] = useUpdateWebhookMutation();

  const onFinish = () => {
    const values: NameFormValues = form.getFieldsValue();

    const newWebhook = {
      ...webhookDetails!,
      ...values,
    };

    updateWebhook(newWebhook).then(() => {
      setWebhookDetails(newWebhook);
      form.resetFields();
    });
  };

  useEffect(() => {
    form.setFieldValue('name', webhookDetails?.name);
  }, [webhookDetails]);

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={{
        name: webhookDetails?.name ?? '',
      }}
    >
      <ConfigurationCard
        title="Notification name"
        description="Define the name of your notification"
        footerText={
          <>
            Learn more about{' '}
            <ExternalLink href={externalLinks.notificationsAndWebhooks}>notifications and webhooks</ExternalLink>
          </>
        }
        onConfirm={onFinish}
        onCancel={() => form.resetFields()}
      >
        <FormItem name="name" label="Name" required rules={[requiredNoText]}>
          <Input placeholder="Notification name" />
        </FormItem>
      </ConfigurationCard>
    </Form>
  );
};

export default Name;
