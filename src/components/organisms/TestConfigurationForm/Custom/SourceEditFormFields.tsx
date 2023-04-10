import {Path, Revision} from '@molecules';

import {StyledFormSpace} from '../TestConfigurationForm.styled';

type CustomFormFieldsProps = {
  executorType: string;
};

const CustomFormFields: React.FC<CustomFormFieldsProps> = props => {
  const {executorType} = props;

  return (
    <StyledFormSpace size={24} direction="vertical">
      <Revision />
      <Path testType={executorType} />
    </StyledFormSpace>
  );
};

export default CustomFormFields;
