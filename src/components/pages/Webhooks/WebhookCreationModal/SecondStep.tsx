import {FC} from 'react';

import {Button, FormItem, FullWidthSpace, Input} from '@custom-antd';

import {requiredNoText, url} from '@utils/form';

interface SecondStepProps {
  onStepChange: (number: number) => void;
}

export const SecondStep: FC<SecondStepProps> = ({onStepChange}) => {
  return (
    <FullWidthSpace size={20} direction="vertical">
      <FormItem label="URI" name="uri" required rules={[requiredNoText, url]}>
        <Input placeholder="Webhook URI" />
      </FormItem>
      <FullWidthSpace size={15} justify="flex-end">
        <Button
          onClick={() => {
            onStepChange(0);
          }}
        >
          Back
        </Button>
        <Button htmlType="submit">Submit</Button>
      </FullWidthSpace>
    </FullWidthSpace>
  );
};
