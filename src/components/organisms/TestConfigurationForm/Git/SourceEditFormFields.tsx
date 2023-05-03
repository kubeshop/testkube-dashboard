import {useState} from 'react';

import {NamePath} from 'antd/lib/form/interface';

import {Path, Repository, Revision, SecretFormItem} from '@molecules';

import useValidateRepository from '@hooks/useValidateRepository';

import {useValidateRepositoryMutation} from '@services/repository';

import {StyledFormSpace} from '../TestConfigurationForm.styled';

type SourceEditProps = {
  executorType: string;
  isClearedToken?: boolean;
  setIsClearedToken?: (value: boolean) => void;
  isClearedUsername?: boolean;
  setIsClearedUsername?: (value: boolean) => void;
  getFieldValue: (name: NamePath) => string;
};

const SourceEdit: React.FC<SourceEditProps> = props => {
  const {executorType, isClearedToken, setIsClearedToken, isClearedUsername, setIsClearedUsername, getFieldValue} =
    props;

  const [validationState, setValidationState] = useState<any>({
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

export default SourceEdit;
