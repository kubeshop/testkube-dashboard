import {StyledFormSpace} from '../TestConfigurationForm.styled';
import {Branch, Path} from '../molecules';

type CustomFormFieldsProps = {
  executorType: string;
};

const CustomFormFields: React.FC<CustomFormFieldsProps> = props => {
  const {executorType} = props;

  return (
    <StyledFormSpace size={24} direction="vertical">
      <Branch />
      <Path testType={executorType} />
    </StyledFormSpace>
  );
};

export default CustomFormFields;
