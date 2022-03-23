import {formatExecutionDate} from '@utils/formatDate';

import {StyledExecutionStartEndDate} from './ExecutionTableRow.styled';

export const ExecutionStartEndTime: React.FC<any> = props => {
  const {startTime, endTime, duration} = props;

  const value = `${formatExecutionDate(startTime)} | ${formatExecutionDate(endTime)} - ${duration}`;

  return <StyledExecutionStartEndDate>{value}</StyledExecutionStartEndDate>;
};
