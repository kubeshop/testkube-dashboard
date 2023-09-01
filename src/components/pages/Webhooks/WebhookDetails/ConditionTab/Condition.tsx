import {FC, useMemo} from 'react';

import {Form} from 'antd';

import {CreatableMultiSelect} from '@atoms';

import {FormItem} from '@custom-antd';

import {WebhookEvent} from '@models/webhook';

import {LabelSelectorHelpIcon, LabelsSelect, notificationCall} from '@molecules';

import {CardForm} from '@organisms';

import {Permissions, usePermission} from '@permissions/base';

import {useUpdateWebhookMutation} from '@services/webhooks';

import {useWebhooksPick} from '@store/webhooks';

import {requiredNoText} from '@utils/form';
import {displayDefaultNotificationFlow} from '@utils/notification';
import {decodeSelectorArray} from '@utils/selectors';

type ConditionFormValues = {
  events: {label: WebhookEvent; value: WebhookEvent}[];
  labels: {label: string; value: string}[];
};

const webhookEvents = Object.keys(WebhookEvent).map(item => {
  const value = WebhookEvent[item as keyof typeof WebhookEvent];
  return {label: value, value};
});

const Condition: FC = () => {
  const {current} = useWebhooksPick('current');
  const mayEdit = usePermission(Permissions.editEntity);

  const initialEvents = current!.events.map(item => ({label: item, value: item}));
  const initialLabels = useMemo(
    () => decodeSelectorArray(current!.selector).map(({key, value}) => `${key}:${value}`),
    [current!.selector]
  );

  const [form] = Form.useForm<ConditionFormValues>();

  const [updateWebhook] = useUpdateWebhookMutation();

  const onFinish = () => {
    const values = form.getFieldsValue();
    const selector = values.labels.map(x => x.value.replace(':', '=')).join(',');
    return updateWebhook({
      ...current!,
      events: values.events.map(x => x.value),
      selector,
    })
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
      initialValues={{events: initialEvents, labels: initialLabels}}
      disabled={!mayEdit}
      onConfirm={onFinish}
    >
      <FormItem
        name="labels"
        label={
          <>
            Resource identifier <LabelSelectorHelpIcon />
          </>
        }
        required
      >
        <LabelsSelect placeholder="All resources" stylePlaceholderAsValue />
      </FormItem>
      <FormItem name="events" required rules={[requiredNoText]} label="Triggered events">
        <CreatableMultiSelect
          placeholder="Select Testkube resource"
          options={webhookEvents}
          menuPlacement="top"
          formatCreateLabel={val => val}
        />
      </FormItem>
    </CardForm>
  );
};

export default Condition;
