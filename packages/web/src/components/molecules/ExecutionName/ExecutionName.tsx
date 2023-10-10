import {StyledExecutionName} from './ExecutionName.styled';

type ExecutionNameProps = {
  name: string;
};

const ExecutionName: React.FC<ExecutionNameProps> = props => {
  const {name} = props;

  return <StyledExecutionName ellipsis>{name}</StyledExecutionName>;
};

export default ExecutionName;
