import {formatExecutionDate} from '@utils/formatDate';

import {StyledExecutionStartEndDate} from './ExecutionTableRow.styled';

export const ExecutionStartEndTime: React.FC<any> = props => {
  const {startTime, endTime, duration, status} = props;

  const formattedStartTime = `${formatExecutionDate(startTime)} | `;
  const formattedEndTime = status === 'running' ? 'Still running...' : formatExecutionDate(endTime);
  const formattedDuration = duration ? ` - ${duration}` : '';

  const value = formattedStartTime + formattedEndTime + formattedDuration;

  return <StyledExecutionStartEndDate>{value}</StyledExecutionStartEndDate>;
};
