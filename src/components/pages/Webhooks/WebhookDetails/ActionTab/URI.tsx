import {FC} from 'react';

import {Form, Input} from 'antd';

import {FormItem} from '@custom-antd';

import {notificationCall} from '@molecules';

import {CardForm} from '@organisms';

import {Permissions, usePermission} from '@permissions/base';

import {useUpdateWebhookMutation} from '@services/webhooks';

import {useWebhooksPick} from '@store/webhooks';

import {requiredNoText, url} from '@utils/form';
import {displayDefaultNotificationFlow} from '@utils/notification';

type URIFormValues = {
  name: string;
};

const URI: FC = () => {
  const {current} = useWebhooksPick('current');
  const mayEdit = usePermission(Permissions.editEntity);

  const [form] = Form.useForm<URIFormValues>();

  const [updateWebhook] = useUpdateWebhookMutation();

  const onFinish = () => {
    const values = form.getFieldsValue();

    return updateWebhook({...current!, ...values})
      .then(displayDefaultNotificationFlow)
      .then(() => notificationCall('passed', 'The URI was successfully updated.'));
  };

  return (
    <CardForm
      name="webhook-uri"
      title="Endpoint URI"
      description="Define the target URI which we will call with this notification."
      form={form}
      initialValues={{uri: current!.uri || ''}}
      disabled={!mayEdit}
      onConfirm={onFinish}
    >
      <FormItem name="uri" label="URI" required rules={[requiredNoText, url]}>
        <Input placeholder="URI" />
      </FormItem>
    </CardForm>
  );
};

export default URI;
