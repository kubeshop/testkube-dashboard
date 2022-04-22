import {StyledExecutionSequenceNumber} from './ExecutionTableRow.styled';

type ExecutionSequenceNumberProps = {
  index: number;
};

export const ExecutionSequenceNumber: React.FC<ExecutionSequenceNumberProps> = props => {
  const {index} = props;

  return <StyledExecutionSequenceNumber>#{index}</StyledExecutionSequenceNumber>;
};
