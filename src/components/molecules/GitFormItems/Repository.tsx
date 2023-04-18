import {Input} from 'antd';

import {FormItem} from '@custom-antd';

import {required, url} from '@utils/form';

import FormItemLabel from './FormItemLabel';
import {getValidationTooltip, tooltipStatus} from './tooltipUtils';

type RepositoryProps = {
  status?: tooltipStatus;
  message?: string;
};

const Repository: React.FC<RepositoryProps> = props => {
  const {status = 'none', message} = props;

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

export default Repository;
