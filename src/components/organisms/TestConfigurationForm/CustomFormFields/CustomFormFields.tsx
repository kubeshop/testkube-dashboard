import {StyledFormSpace} from '../TestConfigurationForm.styled';
import Branch from '../molecules/Branch';
import Path from '../molecules/Path';

type GitFormFieldsProps = {
  executorType: string;
};

const GitFormFields: React.FC<GitFormFieldsProps> = props => {
  const {executorType} = props;

  return (
    <StyledFormSpace size={24} direction="vertical">
      <Branch />
      <Path testType={executorType} />
    </StyledFormSpace>
  );
};

export default GitFormFields;
