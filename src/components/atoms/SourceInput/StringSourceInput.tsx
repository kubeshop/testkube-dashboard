import React, {FC} from 'react';

import {Input} from 'antd';
import {FormItem} from '@custom-antd';

import {ControlledForm} from '@atoms';
import Fonts from '@styles/Fonts';

import {Source} from '@models';

export interface StringSourceInputProps {
  value?: Source;
  onChange?: (source: Source) => void;
}

export const StringSourceInput: FC<StringSourceInputProps> = ({value, onChange}) => {
  return (
    <ControlledForm
      virtual
      style={{width: '100%'}}
      layout='vertical'
      Validator={Source}
      value={value}
      onChange={onChange}
    >
      <FormItem name='data' label='String' required>
        <Input.TextArea rows={10} placeholder='String' style={{fontFamily: Fonts.robotoMono}} />
      </FormItem>
    </ControlledForm>
  );
};
