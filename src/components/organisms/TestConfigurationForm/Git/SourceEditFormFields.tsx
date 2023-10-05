import {useState} from 'react';

import useValidateRepository, {ValidationState} from '@hooks/useValidateRepository';

import {Path, Repository, Revision, SecretFormItem} from '@molecules';

import {useValidateRepositoryMutation} from '@services/repository';

import {StyledFormSpace} from '../TestConfigurationForm.styled';
import {Props} from '../utils';

const SourceEdit: React.FC<Partial<Props>> = props => {
  const {
    executorType,
    isClearedToken,
    setIsClearedToken,
    isClearedUsername,
    setIsClearedUsername,
    getFieldValue,
    disabled,
  } = props as Props;

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
        disabled={disabled}
      />
      <SecretFormItem
        name="username"
        label="Git Username"
        isClearedValue={isClearedUsername}
        setIsClearedValue={setIsClearedUsername}
        message={validationState.message}
        status={validationState.username}
        disabled={disabled}
      />
      <Revision
        message={validationState.message}
        branchStatus={validationState.branch}
        commitStatus={validationState.commit}
        disabled={disabled}
      />
      <Path testType={executorType} message={validationState.message} status={validationState.path} />
    </StyledFormSpace>
  );
};

export default SourceEdit;
