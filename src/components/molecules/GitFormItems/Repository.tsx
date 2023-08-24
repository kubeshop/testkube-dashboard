import {FC} from 'react';

import {Input} from 'antd';

import {FormItem} from '@custom-antd/Form/FormItem';
import {FormItemLabel} from '@custom-antd/Form/FormItem/FormItemLabel';

import {required, url} from '@utils/form';

import {TooltipStatus, getValidationTooltip} from './tooltipUtils';

type RepositoryProps = {
  status?: TooltipStatus;
  message?: string;
};

export const Repository: FC<RepositoryProps> = props => {
  const {status = TooltipStatus.None, message} = props;

  return (
    <FormItem
      name="uri"
      key="uri"
      label={
        <FormItemLabel
          text="Git repository URI"
          tooltipMessage="We do currently only support checking out repositories via https"
          required
          status={status}
        />
      }
      rules={[required, url]}
      tooltip={getValidationTooltip(status, message)}
      // required mark is shown in custom label component
      required={false}
    >
      <Input placeholder="e.g.: https://github.com/myCompany/myRepo.git" />
    </FormItem>
  );
};
