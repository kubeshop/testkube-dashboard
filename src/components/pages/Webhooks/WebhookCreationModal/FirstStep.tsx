import {FC} from 'react';

import {CreatableMultiSelect} from '@atoms';

import {Button, FormItem, FullWidthSpace, Text} from '@custom-antd';

import {WebhookEvent} from '@models/webhook';

import {LabelSelectorHelpIcon, LabelsSelect} from '@molecules';

import Colors from '@styles/Colors';

import {requiredNoText} from '@utils/form';

interface FirstStepProps {
  onStepChange: (number: number) => void;
}

const webhookEvents = Object.keys(WebhookEvent).map(item => {
  const value = WebhookEvent[item as keyof typeof WebhookEvent];
  return {label: value, value};
});

export const FirstStep: FC<FirstStepProps> = ({onStepChange}) => (
  <FullWidthSpace direction="vertical" size={20}>
    <Text color={Colors.slate400} className="regular middle">
      Define the conditions to be met for the trigger to be called.
    </Text>
    <FormItem
      name="selector"
      label={
        <>
          Resource identifier <LabelSelectorHelpIcon />
        </>
      }
      required
    >
      <LabelsSelect placeholder="All resources" stylePlaceholderAsValue />
    </FormItem>
    <FormItem noStyle shouldUpdate>
      {({getFieldError}) => (
        <FormItem name="events" required rules={[requiredNoText]} label="Triggered events">
          <CreatableMultiSelect
            placeholder="Select Testkube resource"
            options={webhookEvents}
            menuPlacement="top"
            formatCreateLabel={val => val}
            validation={getFieldError('events').length === 0}
          />
        </FormItem>
      )}
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
