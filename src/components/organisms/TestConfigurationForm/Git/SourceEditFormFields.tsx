import {FC, useState} from 'react';

import {ValidationState, useValidateRepository} from '@hooks/useValidateRepository';

import {Path} from '@molecules/GitFormItems/Path';
import {Repository} from '@molecules/GitFormItems/Repository';
import {Revision} from '@molecules/GitFormItems/Revision';
import {SecretFormItem} from '@molecules/GitFormItems/SecretFormItem';

import {StyledFormSpace} from '@organisms/TestConfigurationForm.styled';
import type {Props} from '@organisms/TestConfigurationForm/utils';

import {useValidateRepositoryMutation} from '@services/repository';

export const SourceEdit: FC<Partial<Props>> = props => {
  const {executorType, isClearedToken, setIsClearedToken, isClearedUsername, setIsClearedUsername, getFieldValue} =
    props as Props;

  const [validationState, setValidationState] = useState<ValidationState>({
    message: '',
  });

  const [validateRepository] = useValidateRepositoryMutation();

  useValidateRepository(getFieldValue, setValidationState, validateRepository);

  return (
    <StyledFormSpace size={24} direction="vertical">
      <Repository message={validationState.message} status={validationState.uri} />
      <SecretFormItem
        name="token"
        label="Git Token"
        isClearedValue={isClearedToken}
        setIsClearedValue={setIsClearedToken}
        message={validationState.message}
        status={validationState.token}
      />
      <SecretFormItem
        name="username"
        label="Git Username"
        isClearedValue={isClearedUsername}
        setIsClearedValue={setIsClearedUsername}
        message={validationState.message}
        status={validationState.username}
      />
      <Revision
        message={validationState.message}
        branchStatus={validationState.branch}
        commitStatus={validationState.commit}
      />
      <Path testType={executorType} message={validationState.message} status={validationState.path} />
    </StyledFormSpace>
  );
};
