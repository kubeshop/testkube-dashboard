import {FC} from 'react';

import {Input} from 'antd';

import {ExternalLink} from '@atoms';

import {FormItem} from '@custom-antd';

import {CardForm} from '@organisms';

import {useWebhooksPick} from '@store/webhooks';

import {externalLinks} from '@utils/externalLinks';
import {requiredNoText} from '@utils/form';

const Name: FC = () => {
  const {current} = useWebhooksPick('current');
  return (
    <CardForm
      name="general-settings-name"
      title="Notification name"
      description="Define the name of your webhook"
      footer={
        <>
          Learn more about <ExternalLink href={externalLinks.notificationsAndWebhooks}>webhooks</ExternalLink>
        </>
      }
      initialValues={{name: current!.name}}
      readOnly
    >
      <FormItem name="name" label="Name" required rules={[requiredNoText]}>
        <Input placeholder="Webhook name" disabled />
      </FormItem>
    </CardForm>
  );
};

export default Name;
