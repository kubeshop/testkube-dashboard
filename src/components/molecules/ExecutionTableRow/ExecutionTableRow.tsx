import {ExecutionName} from './ExecutionName';
import {ExecutionStartTime} from './ExecutionStartTime';
import {ExecutionStatus} from './ExecutionStatus';
import {StyledChevronRightIcon, StyledSpace} from './ExecutionTableRow.styled';

const ExecutionTableRow = (props: any) => {
  const {status, startTime, name, testType, testName, endTime, labels} = props;

  return (
    <StyledSpace>
      <ExecutionStatus status={status} />
      <ExecutionStartTime startTime={startTime} />
      <ExecutionName name={name} />
      <StyledChevronRightIcon />
    </StyledSpace>
  );
};

export default ExecutionTableRow;
