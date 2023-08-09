import {FC} from 'react';

import {Select} from 'antd';

import {Button, FormItem, FullWidthSpace, Text} from '@custom-antd';

import {WebhookEvent} from '@models/webhook';

import {LabelsSelect} from '@molecules';

import Colors from '@styles/Colors';

import {requiredNoText} from '@utils/form';

interface FirstStepProps {
  onStepChange: (number: number) => void;
}

export const FirstStep: FC<FirstStepProps> = ({onStepChange}) => {
  return (
    <FullWidthSpace direction="vertical" size={20}>
      <Text color={Colors.slate400} className="regular middle">
        Define the conditions to be met for the trigger to be called.
      </Text>
      <FormItem name="resource" required rules={[requiredNoText]} label="Resource">
        <Select placeholder="Select Testkube resource">
          <Select.Option value="test">Test</Select.Option>
        </Select>
      </FormItem>
      <FormItem name="resource-identifier" required rules={[requiredNoText]} label="Resource identifier">
        <LabelsSelect />
      </FormItem>
      <FormItem name="events" required rules={[requiredNoText]} label="Triggered events">
        <Select placeholder="Select Testkube resource">
          {Object.keys(WebhookEvent).map(item => {
            return (
              <Select.Option key={item} value={item}>
                {/* @ts-ignore */}
                {WebhookEvent[item]}
              </Select.Option>
            );
          })}
        </Select>
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
