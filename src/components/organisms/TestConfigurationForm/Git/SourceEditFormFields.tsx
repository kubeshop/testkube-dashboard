import {StyledFormSpace} from '../TestConfigurationForm.styled';
import {Path, Repository, Revision, SecretFormItem} from '../molecules';

type SourceEditProps = {
  executorType: string;
  isClearedToken?: boolean;
  setIsClearedToken?: (value: boolean) => void;
  isClearedUsername?: boolean;
  setIsClearedUsername?: (value: boolean) => void;
};

const SourceEdit: React.FC<SourceEditProps> = props => {
  const {executorType, isClearedToken, setIsClearedToken, isClearedUsername, setIsClearedUsername} = props;

  return (
    <StyledFormSpace size={24} direction="vertical">
      <Repository />
      <SecretFormItem
        name="token"
        label="Git Token"
        isClearedValue={isClearedToken}
        setIsClearedValue={setIsClearedToken}
      />
      <SecretFormItem
        name="username"
        label="Git Username"
        isClearedValue={isClearedUsername}
        setIsClearedValue={setIsClearedUsername}
      />
      <Revision />
      <Path testType={executorType} />
    </StyledFormSpace>
  );
};

export default SourceEdit;
