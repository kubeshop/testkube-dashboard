import TextArea from 'antd/lib/input/TextArea';

import {FormItem} from '@custom-antd';

import Fonts from '@styles/Fonts';

import {required} from '@utils/form';

const StringContentFields: React.FC = () => {
  return (
    <FormItem name="string" label="String" rules={[required]} required>
      <TextArea rows={10} placeholder="String..." style={{fontFamily: Fonts.robotoMono}} />
    </FormItem>
  );
};

export default StringContentFields;
