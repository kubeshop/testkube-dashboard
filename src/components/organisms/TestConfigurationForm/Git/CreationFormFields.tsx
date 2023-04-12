import {useState} from 'react';

import {NamePath} from 'antd/lib/form/interface';

import {Branch, Path, Repository, SecretFormItem} from '@molecules';

import useValidateRepository from '@hooks/useValidateRepository';

import {useValidateRepositoryMutation} from '@services/repository';

import {StyledFormSpace} from '../TestConfigurationForm.styled';

type GitFormFieldsProps = {
  executorType: string;
  getFieldValue: (name: NamePath) => string;
};

const GitFormFields: React.FC<GitFormFieldsProps> = props => {
  const {executorType, getFieldValue} = props;

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
      <Path testType={executorType} />
    </StyledFormSpace>
  );
};

export default GitFormFields;
