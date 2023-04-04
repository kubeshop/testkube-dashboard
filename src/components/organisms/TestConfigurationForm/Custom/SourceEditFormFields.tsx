import {StyledFormSpace} from '../TestConfigurationForm.styled';
import {BranchCommit, Path} from '../molecules';

type CustomFormFieldsProps = {
  executorType: string;
};

const CustomFormFields: React.FC<CustomFormFieldsProps> = props => {
  const {executorType} = props;

  return (
    <StyledFormSpace size={24} direction="vertical">
      <BranchCommit />
      <Path testType={executorType} />
    </StyledFormSpace>
  );
};

export default CustomFormFields;
