import {StyledExecutionName} from './ExecutionName.styled';

type ExecutionNameProps = {
  name: string;
};

const ExecutionName: React.FC<ExecutionNameProps> = props => {
  const {name} = props;

  return <StyledExecutionName>{name}</StyledExecutionName>;
};

export default ExecutionName;
