import {StyledTestRunnerIcon} from './TestRunnerIcon.styled';

type TestRunnerIconProps = {
  icon: string;
};

const TestRunnerIcon: React.FC<TestRunnerIconProps> = props => {
  const {icon} = props;

  return <StyledTestRunnerIcon src={icon} />;
};

export default TestRunnerIcon;
