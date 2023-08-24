import {FC} from 'react';

import {Form} from 'antd';

import {CreatableMultiSelect} from '@atoms';

import {FormItem} from '@custom-antd';

import {Option} from '@models/form';
import {WebhookEvent} from '@models/webhook';

import {LabelsSelect, notificationCall} from '@molecules';
import {composeLabels} from '@molecules/LabelsSelect/utils';

import {CardForm} from '@organisms';

import {Permissions, usePermission} from '@permissions/base';

import {useUpdateWebhookMutation} from '@services/webhooks';

import {useWebhooksPick} from '@store/webhooks';

import {requiredNoText} from '@utils/form';
import {displayDefaultNotificationFlow} from '@utils/notification';

type ConditionFormValues = {
  events: {label: WebhookEvent; value: WebhookEvent}[];
  labels: Record<string, Option>;
};

const webhookEvents = Object.keys(WebhookEvent).map(item => {
  const value = WebhookEvent[item as keyof typeof WebhookEvent];
  return {label: value, value};
});

const Condition: FC = () => {
  const {current} = useWebhooksPick('current');
  const mayEdit = usePermission(Permissions.editEntity);

  const [form] = Form.useForm<ConditionFormValues>();

  const [updateWebhook] = useUpdateWebhookMutation();

  const onFinish = () => {
    const values = form.getFieldsValue();

    // @ts-ignore
    return updateWebhook({...current!, ...values})
      .then(displayDefaultNotificationFlow)
      .then(() => notificationCall('passed', 'The conditions were successfully updated.'));
  };

  return (
    <CardForm
      name="webhook-condition"
      title="Webhook condition"
      description="Define the conditions to be met for the webhook to be called."
      spacing={20}
      form={form}
      initialValues={{
        events: current!.events.map(item => ({label: item, value: item})) || [],
        labels: composeLabels((current!.labels as unknown as Record<string, Option>) || []) || {},
      }}
      disabled={!mayEdit}
      onConfirm={onFinish}
    >
      <FormItem noStyle shouldUpdate>
        {({getFieldError}) => {
          const isValid = !(getFieldError('labels').length > 0);
          const value = form.getFieldValue('labels');

          return (
            <FormItem name="labels" required rules={[requiredNoText]} label="Resource identifier">
              <LabelsSelect
                validation={isValid}
                // @ts-ignore
                defaultLabels={value}
              />
            </FormItem>
          );
        }}
      </FormItem>
      <FormItem noStyle shouldUpdate>
        {({getFieldError}) => {
          const isValid = !(getFieldError('events').length > 0);
          const value = form.getFieldValue('events');

          return (
            <FormItem name="events" required rules={[requiredNoText]} label="Triggered events">
              <CreatableMultiSelect
                placeholder="Select Testkube resource"
                options={webhookEvents}
                menuPlacement="top"
                formatCreateLabel={val => val}
                validation={isValid}
                defaultValue={value}
              />
            </FormItem>
          );
        }}
      </FormItem>
    </CardForm>
  );
};

export default Condition;
