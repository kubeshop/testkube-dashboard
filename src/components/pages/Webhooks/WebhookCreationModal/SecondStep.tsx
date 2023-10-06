import {FC} from 'react';

import {Button, FormItem, FullWidthSpace, Input} from '@custom-antd';

import {requiredNoText, url} from '@utils/form';

interface SecondStepProps {
  onStepChange: (number: number) => void;
}

export const SecondStep: FC<SecondStepProps> = ({onStepChange}) => {
  return (
    <FullWidthSpace size={20} direction="vertical">
      <FormItem label="URI" name="uri" required rules={[requiredNoText, url]} data-test="webhooks-add-modal-url">
        <Input placeholder="Webhook URI" />
      </FormItem>
      <FullWidthSpace size={15} justify="flex-end">
        <Button
          data-test="webhooks-add-modal-next:second"
          onClick={() => {
            onStepChange(0);
          }}
          $customType="secondary"
        >
          Back
        </Button>
        <Button htmlType="submit">Submit</Button>
      </FullWidthSpace>
    </FullWidthSpace>
  );
};
