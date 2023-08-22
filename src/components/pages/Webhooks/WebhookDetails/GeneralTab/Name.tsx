import {FC, useContext, useEffect} from 'react';

import {Form, Input} from 'antd';

import {ExternalLink} from '@atoms';

import {FormItem} from '@custom-antd';

import {ConfigurationCard} from '@molecules';

import {externalLinks} from '@utils/externalLinks';
import {requiredNoText} from '@utils/form';

import WebhookDetailsContext from '../WebhookDetailsContext';

type NameFormValues = {
  name: string;
};

const Name: FC = () => {
  const [form] = Form.useForm<NameFormValues>();

  const {webhookDetails} = useContext(WebhookDetailsContext);

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
      disabled
    >
      <ConfigurationCard
        title="Notification name"
        description="Define the name of your webhook"
        footer={
          <>
            Learn more about <ExternalLink href={externalLinks.notificationsAndWebhooks}>webhooks</ExternalLink>
          </>
        }
      >
        <FormItem name="name" label="Name" required rules={[requiredNoText]}>
          <Input placeholder="Webhook name" disabled />
        </FormItem>
      </ConfigurationCard>
    </Form>
  );
};

export default Name;
