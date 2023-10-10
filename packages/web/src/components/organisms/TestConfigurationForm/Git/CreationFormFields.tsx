import {useState} from 'react';

import useValidateRepository from '@hooks/useValidateRepository';

import {Branch, Path, Repository, SecretFormItem} from '@molecules';

import {useValidateRepositoryMutation} from '@services/repository';

import {StyledFormSpace} from '../TestConfigurationForm.styled';
import {Props} from '../utils';

const GitFormFields: React.FC<Partial<Props>> = props => {
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

export default GitFormFields;
