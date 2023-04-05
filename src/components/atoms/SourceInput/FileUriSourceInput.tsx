import React, {FC} from 'react';

import {Input} from 'antd';
import {FormItem} from '@custom-antd';

import {ControlledForm} from '@atoms';

import {Source} from '@models';

export interface FileUriSourceInputProps {
  value?: Source;
  onChange?: (source: Source) => void;
}

export const FileUriSourceInput: FC<FileUriSourceInputProps> = ({value, onChange}) => {
  return (
    <ControlledForm layout='vertical' Validator={Source} component='div' value={value} onChange={onChange}>
      <FormItem name='uri' label='File URL' required>
        <Input placeholder='e.g.: https://domain.com/template.json' />
      </FormItem>
    </ControlledForm>
  );
};
