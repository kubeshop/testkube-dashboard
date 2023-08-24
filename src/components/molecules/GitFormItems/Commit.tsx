import {FC} from 'react';

import {Input} from 'antd';

import {FormItem} from '@custom-antd/Form/FormItem';
import {FormItemLabel} from '@custom-antd/Form/FormItem/FormItemLabel';

import {required} from '@utils/form';

import {TooltipStatus, getValidationTooltip} from './tooltipUtils';

type CommitProps = {
  status?: TooltipStatus;
  message?: string;
};

export const Commit: FC<CommitProps> = props => {
  const {status = TooltipStatus.None, message} = props;

  return (
    <FormItem
      name="commit"
      label={<FormItemLabel status={status} required text="Commit" />}
      rules={[required]}
      // required mark is shown in custom label component
      required={false}
      tooltip={getValidationTooltip(status, message)}
      key="commit"
    >
      <Input placeholder="Enter commit id..." />
    </FormItem>
  );
};
