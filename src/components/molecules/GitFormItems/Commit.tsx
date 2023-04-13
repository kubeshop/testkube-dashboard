import {Input} from 'antd';

import {FormItem} from '@custom-antd';

import {required} from '@utils/form';

import FormItemLabel from './FormItemLabel';
import {getTooltip, tooltipStatus} from './tooltipUtils';

type CommitProps = {
  status?: tooltipStatus;
  message?: string;
};

const Commit: React.FC<CommitProps> = props => {
  const {status = 'none', message} = props;
  return (
    <FormItem
      name="commit"
      label={<FormItemLabel status={status} required text="Commit" />}
      rules={[required]}
      // required mark is shown in custom label component
      required={false}
      tooltip={getTooltip(status, message)}
      key="commit"
    >
      <Input placeholder="Enter commit id..." />
    </FormItem>
  );
};

export default Commit;
