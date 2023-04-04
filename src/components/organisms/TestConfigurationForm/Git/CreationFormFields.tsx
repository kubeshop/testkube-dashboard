import {StyledFormSpace} from '../TestConfigurationForm.styled';
import {Branch, Path, Repository, SecretFormItem} from '../molecules';

type GitFormFieldsProps = {
  executorType: string;
};

const GitFormFields: React.FC<GitFormFieldsProps> = props => {
  const {executorType} = props;

  return (
    <StyledFormSpace size={24} direction="vertical">
      <Repository />
      <SecretFormItem name="token" label="Git Token" />
      <SecretFormItem name="username" label="Git Username" />
      <Branch />
      <Path testType={executorType} />
    </StyledFormSpace>
  );
};

export default GitFormFields;
