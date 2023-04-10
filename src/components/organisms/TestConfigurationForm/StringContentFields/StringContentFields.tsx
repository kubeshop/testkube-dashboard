import TextArea from 'antd/lib/input/TextArea';

import {FormItem} from '@custom-antd';

import {required} from '@utils/form';

import Fonts from '@styles/Fonts';

const StringContentFields = () => {
  return (
    <FormItem name="string" label="String" rules={[required]} required>
      <TextArea rows={10} placeholder="String..." style={{fontFamily: Fonts.robotoMono}} />
    </FormItem>
  );
};

export default StringContentFields;
