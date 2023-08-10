import {FC} from 'react';

import {Select} from 'antd';

import {CreatableMultiSelect} from '@atoms';

import {Button, FormItem, FullWidthSpace, Text} from '@custom-antd';

import {WebhookEvent} from '@models/webhook';

import {LabelsSelect} from '@molecules';

import Colors from '@styles/Colors';

import {requiredNoText} from '@utils/form';

interface FirstStepProps {
  onStepChange: (number: number) => void;
}

export const FirstStep: FC<FirstStepProps> = ({onStepChange}) => {
  const webhookEvents = Object.keys(WebhookEvent).map(item => {
    const value = WebhookEvent[item as keyof typeof WebhookEvent];

    return {
      label: value,
      value,
    };
  });

  return (
    <FullWidthSpace direction="vertical" size={20}>
      <Text color={Colors.slate400} className="regular middle">
        Define the conditions to be met for the trigger to be called.
      </Text>
      <FormItem name="resource" required rules={[requiredNoText]} label="Resource">
        <Select placeholder="Select Testkube resource">
          <Select.Option value="test">Test</Select.Option>
          <Select.Option value="test-source">Test Source</Select.Option>
        </Select>
      </FormItem>
      <FormItem noStyle shouldUpdate>
        {({getFieldError, getFieldValue}) => {
          const isValid = !(getFieldError('events').length > 0);

          return (
            <FormItem name="labels" required rules={[requiredNoText]} label="Resource identifier">
              <LabelsSelect validation={isValid} defaultLabels={getFieldValue('labels')} />
            </FormItem>
          );
        }}
      </FormItem>
      <FormItem noStyle shouldUpdate>
        {({getFieldError, getFieldValue}) => {
          const isValid = !(getFieldError('events').length > 0);

          return (
            <FormItem name="events" required rules={[requiredNoText]} label="Triggered events">
              <CreatableMultiSelect
                placeholder="Select Testkube resource"
                options={webhookEvents}
                menuPlacement="top"
                formatCreateLabel={val => val}
                validation={isValid}
                defaultValue={getFieldValue('events')}
              />
            </FormItem>
          );
        }}
      </FormItem>
      <FullWidthSpace justify="flex-end">
        <Button
          onClick={() => {
            onStepChange(1);
          }}
        >
          Next
        </Button>
      </FullWidthSpace>
    </FullWidthSpace>
  );
};
