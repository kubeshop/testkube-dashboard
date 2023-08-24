import React, {FC, Suspense, useEffect, useState} from 'react';

import {Form} from 'antd';

import {MonacoEditor} from '@atoms';

import {useLastCallback} from '@hooks/useLastCallback';

import {notificationCall} from '@molecules';
import DefinitionSkeleton from '@molecules/Definition/DefinitionSkeleton';

import {CardForm} from '@organisms';

import {Permissions, usePermission} from '@permissions/base';

import {useUpdateWebhookMutation} from '@services/webhooks';

import {useWebhooksPick} from '@store/webhooks';

import {displayDefaultNotificationFlow} from '@utils/notification';

type CustomPayloadFormValues = {
  payloadTemplate: string;
};

const CustomPayload: FC = () => {
  const {current} = useWebhooksPick('current');
  const mayEdit = usePermission(Permissions.editEntity);
  const [form] = Form.useForm<CustomPayloadFormValues>();

  const initialValue = current!.payloadTemplate || '';
  const [value, setValue] = useState(initialValue);

  const [updateWebhook] = useUpdateWebhookMutation();

  const onFinish = () => {
    const values = form.getFieldsValue();
    return updateWebhook({...current!, ...values})
      .then(displayDefaultNotificationFlow)
      .then(() => notificationCall('passed', 'The custom payload was successfully updated.'));
  };

  useEffect(() => {
    setValue(initialValue);
  }, [current]);

  return (
    <CardForm
      name="webhook-payload-template-form"
      title="Custom payload"
      description="Customize the payload we will send with each request."
      disabled={!mayEdit}
      wasTouched={initialValue !== value}
      onConfirm={onFinish}
      onCancel={useLastCallback(() => setValue(initialValue))}
    >
      <Suspense fallback={<DefinitionSkeleton />}>
        <MonacoEditor language="none" value={value} onChange={setValue} />
      </Suspense>
    </CardForm>
  );
};

export default CustomPayload;
