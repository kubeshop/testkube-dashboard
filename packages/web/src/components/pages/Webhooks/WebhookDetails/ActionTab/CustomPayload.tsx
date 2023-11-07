import React, {FC, Suspense} from 'react';

import {Form} from 'antd';

import {MonacoEditor} from '@testkube/code-editor';

import {ExternalLink} from '@atoms';

import {notificationCall} from '@molecules';
import DefinitionSkeleton from '@molecules/Definition/DefinitionSkeleton';

import {CardForm} from '@organisms';

import {Permissions, usePermission} from '@permissions/base';

import {useUpdateWebhookMutation} from '@services/webhooks';

import {externalLinks} from '@src/utils/externalLinks';

import {useWebhooksPick} from '@store/webhooks';

import {displayDefaultNotificationFlow} from '@utils/notification';

type CustomPayloadFormValues = {
  payloadTemplate: string;
};

const CustomPayload: FC = () => {
  const {current} = useWebhooksPick('current');
  const mayEdit = usePermission(Permissions.editEntity);
  const [form] = Form.useForm<CustomPayloadFormValues>();

  const [updateWebhook] = useUpdateWebhookMutation();

  const onFinish = () => {
    const values = form.getFieldsValue();
    return updateWebhook({...current!, ...values})
      .then(displayDefaultNotificationFlow)
      .then(() => notificationCall('passed', 'The custom payload was successfully updated.'));
  };

  return (
    <CardForm
      name="webhook-payload-template-form"
      title="Custom payload"
      description="Customize the payload we will send with each request."
      form={form}
      initialValues={{payloadTemplate: current!.payloadTemplate || ''}}
      disabled={!mayEdit}
      onConfirm={onFinish}
      footer={
        <>
          Learn more about{' '}
          <ExternalLink href={`${externalLinks.notificationsAndWebhooks}/#webhook-payload`} target="_blank">
            webhooks custom payload.
          </ExternalLink>
        </>
      }
    >
      <Suspense fallback={<DefinitionSkeleton />}>
        <Form.Item name="payloadTemplate">
          <MonacoEditor language="none" />
        </Form.Item>
      </Suspense>
    </CardForm>
  );
};

export default CustomPayload;
