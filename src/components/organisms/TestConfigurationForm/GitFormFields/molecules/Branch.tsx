import {Input} from 'antd';

import {FormItem, Text} from '@custom-antd';

import {required} from '@utils/form';

const Branch: React.FC = () => {
  return (
    <FormItem name="branch" label={<Text className="regular middle">Branch</Text>} rules={[required]} required>
      <Input placeholder="e.g.: main" />
    </FormItem>
  );
};

export default Branch;
