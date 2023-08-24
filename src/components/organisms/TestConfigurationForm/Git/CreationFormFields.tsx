import {FC, useState} from 'react';

import {useValidateRepository} from '@hooks/useValidateRepository';

import {Branch} from '@molecules/GitFormItems/Branch';
import {Path} from '@molecules/GitFormItems/Path';
import {Repository} from '@molecules/GitFormItems/Repository';
import {SecretFormItem} from '@molecules/GitFormItems/SecretFormItem';

import {StyledFormSpace} from '@organisms/TestConfigurationForm.styled';
import type {Props} from '@organisms/TestConfigurationForm/utils';

import {useValidateRepositoryMutation} from '@services/repository';

export const GitFormFields: FC<Partial<Props>> = props => {
  const {executorType, getFieldValue} = props as Pick<Props, 'executorType' | 'getFieldValue'>;

  const [validationState, setValidationState] = useState<any>({message: ''});

  const [validateRepository] = useValidateRepositoryMutation();

  useValidateRepository(getFieldValue, setValidationState, validateRepository);

  return (
    <StyledFormSpace size={24} direction="vertical">
      <Repository message={validationState.message} status={validationState.uri} />
      <SecretFormItem message={validationState.message} status={validationState.token} name="token" label="Git Token" />
      <SecretFormItem
        message={validationState.message}
        status={validationState.username}
        name="username"
        label="Git Username"
      />
      <Branch message={validationState.message} status={validationState.branch} />
      <Path testType={executorType} message={validationState.message} status={validationState.path} />
    </StyledFormSpace>
  );
};
