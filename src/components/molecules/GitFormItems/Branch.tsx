import {FC} from 'react';

import {Input} from 'antd';

import {FormItem} from '@custom-antd/Form/FormItem';
import {FormItemLabel} from '@custom-antd/Form/FormItem/FormItemLabel';

import {required} from '@utils/form';

import {TooltipStatus, getValidationTooltip} from './tooltipUtils';

type BranchProps = {
  status?: TooltipStatus;
  message?: string;
};

export const Branch: FC<BranchProps> = props => {
  const {status = TooltipStatus.None, message} = props;

  return (
    <FormItem
      name="branch"
      label={<FormItemLabel status={status} required text="Branch" />}
      rules={[required]}
      // required mark is shown in custom label component
      required={false}
      tooltip={getValidationTooltip(status, message)}
      key="branch"
    >
      <Input placeholder="e.g.: main" />
    </FormItem>
  );
};
