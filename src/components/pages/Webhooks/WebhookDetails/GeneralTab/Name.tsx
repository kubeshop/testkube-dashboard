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

  const {webhooksDetails} = useContext(WebhookDetailsContext);

  useEffect(() => {
    form.setFieldValue('name', webhooksDetails?.name);
  }, [webhooksDetails]);

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={{
        name: webhooksDetails?.name ?? '',
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
      >
        <FormItem name="name" label="Name" required rules={[requiredNoText]}>
          <Input placeholder="Notification name" />
        </FormItem>
      </ConfigurationCard>
    </Form>
  );
};

export default Name;
