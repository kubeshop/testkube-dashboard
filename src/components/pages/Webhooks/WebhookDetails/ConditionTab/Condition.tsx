import {FC, useContext, useEffect} from 'react';

import {Form, Select} from 'antd';

import {CreatableMultiSelect} from '@atoms';

import {FormItem, FullWidthSpace} from '@custom-antd';

import {Option} from '@models/form';
import {WebhookEvent} from '@models/webhook';

import {ConfigurationCard, LabelsSelect} from '@molecules';
import {composeLabels} from '@molecules/LabelsSelect/utils';

import {requiredNoText, url} from '@utils/form';

import WebhookDetailsContext from '../WebhookDetailsContext';

type ConditionFormValues = {
  events: {label: WebhookEvent; value: WebhookEvent}[];
  labels: Record<string, Option>;
};

const Condition: FC = () => {
  const {webhookDetails} = useContext(WebhookDetailsContext);

  const [form] = Form.useForm<ConditionFormValues>();

  const webhookEvents = Object.keys(WebhookEvent).map(item => {
    const value = WebhookEvent[item as keyof typeof WebhookEvent];

    return {
      label: value,
      value,
    };
  });

  useEffect(() => {
    form.setFieldsValue({
      resource: 'test',
      events: webhookDetails?.events.map(item => ({label: item, value: item})) || [],
      // @ts-ignore
      labels: composeLabels((webhookDetails?.labels as unknown as Record<string, Option>) || []) || {},
    });
  }, [webhookDetails]);

  return (
    <Form layout="vertical" form={form}>
      <ConfigurationCard
        title="Notification condition"
        description="Define the conditions to be met for the notification to be called."
      >
        <FullWidthSpace size={20} direction="vertical">
          <FormItem name="resource" label="Resource" required rules={[requiredNoText, url]}>
            <Select disabled>
              <Select.Option value="test">Test</Select.Option>
              <Select.Option value="test-suite">Test Suite</Select.Option>
            </Select>
          </FormItem>
          <FormItem noStyle shouldUpdate>
            {({getFieldError}) => {
              const isValid = !(getFieldError('labels').length > 0);

              return (
                <FormItem name="labels" required rules={[requiredNoText]} label="Resource identifier">
                  <LabelsSelect validation={isValid} />
                </FormItem>
              );
            }}
          </FormItem>
          <FormItem noStyle shouldUpdate>
            {({getFieldError}) => {
              const isValid = !(getFieldError('events').length > 0);

              return (
                <FormItem name="events" required rules={[requiredNoText]} label="Triggered events">
                  <CreatableMultiSelect
                    placeholder="Select Testkube resource"
                    options={webhookEvents}
                    menuPlacement="top"
                    formatCreateLabel={val => val}
                    validation={isValid}
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
