import {StyledExecutionName} from './ExecutionTableRow.styled';

export const ExecutionName = (props: any) => {
  const {name, maxWidth} = props;

  return (
    <StyledExecutionName ellipsis maxWidth={maxWidth}>
      {name}
    </StyledExecutionName>
  );
};
