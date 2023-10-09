import {Input} from 'antd';

import {FormItem, FormItemLabel} from '@custom-antd';

import {required} from '@utils/form';

import {TooltipStatus, getValidationTooltip} from './tooltipUtils';

type CommitProps = {
  status?: TooltipStatus;
  message?: string;
  disabled?: boolean;
};

const Commit: React.FC<CommitProps> = props => {
  const {status = TooltipStatus.None, message, disabled} = props;

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
      <Input placeholder="Enter commit id..." disabled={disabled} />
    </FormItem>
  );
};

export default Commit;
