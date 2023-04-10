import {Input} from 'antd';

import {FormItem, Text} from '@custom-antd';

import {required} from '@utils/form';

const Commit: React.FC = () => {
  return (
    <FormItem
      name="commit"
      label={<Text className="regular middle">Commit</Text>}
      rules={[required]}
      required
      key="commit"
    >
      <Input placeholder="Enter commit id..." />
    </FormItem>
  );
};

export default Commit;
