import {StyledFormSpace} from '../TestConfigurationForm.styled';
import Branch from '../molecules/Branch';
import Path from '../molecules/Path';

type GitFormFieldsProps = {
  testType: string;
};

const GitFormFields: React.FC<GitFormFieldsProps> = props => {
  const {testType} = props;

  return (
    <StyledFormSpace size={24} direction="vertical">
      <Branch />
      <Path testType={testType} />
    </StyledFormSpace>
  );
};

export default GitFormFields;
