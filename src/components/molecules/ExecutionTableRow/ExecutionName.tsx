import {StyledExecutionName} from './ExecutionTableRow.styled';

export const ExecutionName = (props: any) => {
  const {name} = props;

  return <StyledExecutionName>{name}</StyledExecutionName>;
};
