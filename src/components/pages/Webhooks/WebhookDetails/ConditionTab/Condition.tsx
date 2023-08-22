import {FC, useContext, useEffect} from 'react';

import {Form, Select} from 'antd';

import {CreatableMultiSelect} from '@atoms';

import {FormItem, FullWidthSpace} from '@custom-antd';

import {Option} from '@models/form';
import {WebhookEvent} from '@models/webhook';

import {ConfigurationCard, LabelsSelect, notificationCall} from '@molecules';
import {composeLabels} from '@molecules/LabelsSelect/utils';

import {useUpdateWebhookMutation} from '@services/webhooks';

import {requiredNoText} from '@utils/form';

import WebhookDetailsContext from '../WebhookDetailsContext';

type ConditionFormValues = {
  events: {label: WebhookEvent; value: WebhookEvent}[];
  labels: Record<string, Option>;
};

const Condition: FC = () => {
  const {webhookDetails, setWebhookDetails} = useContext(WebhookDetailsContext);

  const [form] = Form.useForm<ConditionFormValues>();

  const [updateWebhook] = useUpdateWebhookMutation();

  const webhookEvents = Object.keys(WebhookEvent).map(item => {
    const value = WebhookEvent[item as keyof typeof WebhookEvent];

    return {
      label: value,
      value,
    };
  });

  const onFinish = (values: ConditionFormValues) => {
    const newWebhook = {
      ...webhookDetails!,
      ...values,
    };

    // @ts-ignore
    updateWebhook(newWebhook).then(() => {
      notificationCall('passed', 'The conditions were successfully updated.');
      // @ts-ignore
      setWebhookDetails(newWebhook);
      form.resetFields();
    });
  };

  useEffect(() => {
    setTimeout(
      () =>
        form.setFieldsValue({
          resource: 'test',
          events: webhookDetails?.events.map(item => ({label: item, value: item})) || [],
          // @ts-ignore
          labels: composeLabels((webhookDetails?.labels as unknown as Record<string, Option>) || []) || {},
        }),
      2000
    );
  }, [webhookDetails]);

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={{
        resource: 'test',
        events: webhookDetails?.events.map(item => ({label: item, value: item})) || [],
        labels: composeLabels((webhookDetails?.labels as unknown as Record<string, Option>) || []) || {},
      }}
      onFinish={onFinish}
    >
      <ConfigurationCard
        title="Webhook condition"
        description="Define the conditions to be met for the webhook to be called."
        onCancel={form.resetFields}
      >
        <FullWidthSpace size={20} direction="vertical">
          <FormItem name="resource" label="Resource" required rules={[requiredNoText]}>
            <Select disabled>
              <Select.Option value="test">Test</Select.Option>
              <Select.Option value="test-suite">Test Suite</Select.Option>
            </Select>
          </FormItem>
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
        </FullWidthSpace>
      </ConfigurationCard>
    </Form>
  );
};

export default Condition;
