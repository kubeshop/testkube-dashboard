import {StyledExecutionSequenceNumber} from './ExecutionTableRow.styled';

export const ExecutionSequenceNumber: React.FC<any> = props => {
  const {index} = props;

  return <StyledExecutionSequenceNumber>#{index}</StyledExecutionSequenceNumber>;
};
