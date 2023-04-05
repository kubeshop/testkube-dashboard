import React, {FC} from 'react';

import {Input} from 'antd';
import {FormItem} from '@custom-antd';

import {ControlledForm} from '@atoms';
import {Source} from '@models';

import {SourceInputExecutor} from './types';
import {getPathPlaceholder} from './utils';
import {StyledSpace} from './SourceInput.styled';

export interface GitCustomSourceInputProps {
  executor?: SourceInputExecutor;
  value?: Source;
  onChange?: (source: Source) => void;
}

// TODO: Unify StyledSpace props
export const GitCustomSourceInput: FC<GitCustomSourceInputProps> = ({executor, value, onChange}) => {
  return (
    <ControlledForm
      virtual
      style={{width: '100%'}}
      layout='vertical'
      Validator={Source}
      value={value}
      onChange={onChange}
    >
      <StyledSpace size={24} direction='vertical'>
        <FormItem name={['repository', 'branch']} label='Branch'>
          <Input placeholder='e.g.: main' />
        </FormItem>
        <FormItem name={['repository', 'path']} label='Path' tooltip='The path is relative to the root of your repository'>
          <Input placeholder={getPathPlaceholder(executor)} />
        </FormItem>
      </StyledSpace>
    </ControlledForm>
  );
};
