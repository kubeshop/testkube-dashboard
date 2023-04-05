import React, {FC, useCallback} from 'react';

import {Input} from 'antd';
import {FormItem, Text} from '@custom-antd';

import Colors from '@styles/Colors';
import {ControlledForm} from '@atoms';
import {tooltipIcons} from '@wizards/AddTestWizard/utils';

import {Source} from '@models';

import {SourceInputExecutor} from './types';
import {getPathPlaceholder} from './utils';
import {StyledSpace} from './SourceInput.styled';

export interface GitSourceInputProps {
  executor?: SourceInputExecutor;
  value?: Source;
  onChange?: (source: Source) => void;
}

// TODO: Extract to config everywhere, along with the path placeholders
const repositoryTooltip = {
  icon: tooltipIcons.default,
  title: 'We do currently only support checking out repositories via https',
};

export const GitSourceInput: FC<GitSourceInputProps> = ({executor, value, onChange}) => {
  const hasUsernameSecret = Boolean(value?.repository?.usernameSecret);
  const hasTokenSecret = Boolean(value?.repository?.tokenSecret);

  const clearUsernameSecret = useCallback(() => {
    onChange?.({...value, repository: {...value?.repository, usernameSecret: undefined}} as Source);
  }, [onChange]);

  const clearTokenSecret = useCallback(() => {
    onChange?.({...value, repository: {...value?.repository, tokenSecret: undefined}} as Source);
  }, [onChange]);

  return (
    <ControlledForm virtual layout='vertical' Validator={Source} value={value} onChange={onChange}>
      <StyledSpace size={24} direction='vertical'>
        <FormItem name={['repository', 'uri']} label='Git repository URI' tooltip={repositoryTooltip} required>
          <Input placeholder='e.g.: https://github.com/myCompany/myRepo.git' />
        </FormItem>
        <FormItem name={['repository', 'branch']} label='Branch' required>
          <Input placeholder='e.g.: main' />
        </FormItem>
        <FormItem name={['repository', 'path']} label='Path' tooltip='The path is relative to the root of your repository'>
          <Input placeholder={getPathPlaceholder(executor)} />
        </FormItem>
        <div>
          <FormItem name={['repository', 'username']} label='Git Username'>
            <Input placeholder={hasUsernameSecret ? '••••••••••' : 'Your username'} />
          </FormItem>
          {hasUsernameSecret ? (
            <Text
              style={{display: 'inline-block', cursor: 'pointer', marginTop: '5px'}}
              className='middle regular'
              color={Colors.indigo400}
              onClick={clearUsernameSecret}
            >
              Remove username
            </Text>
          ) : null}
        </div>
        <div>
          <FormItem name={['repository', 'token']} label='Git Token' tooltip='If required by your repository enter your Personal Access Token (PAT).'>
            <Input.Password placeholder={hasTokenSecret ? '••••••••••' : 'Git Token'} />
          </FormItem>
          {hasTokenSecret ? (
            <Text
              style={{display: 'inline-block', cursor: 'pointer', marginTop: '5px'}}
              className='middle regular'
              color={Colors.indigo400}
              onClick={clearTokenSecret}
            >
              Remove token
            </Text>
          ) : null}
        </div>
      </StyledSpace>
    </ControlledForm>
  );
};
