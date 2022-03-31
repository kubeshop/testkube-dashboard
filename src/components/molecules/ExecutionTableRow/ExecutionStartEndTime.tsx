import {formatExecutionDate} from '@utils/formatDate';

import useIsRunning from '@src/hooks/useIsRunning';

import {StyledExecutionStartEndDate} from './ExecutionTableRow.styled';

export const ExecutionStartEndTime: React.FC<any> = props => {
  const {startTime, endTime, duration, status} = props;

  const isRunning = useIsRunning(status);
  const formattedStartTime = formatExecutionDate(startTime);
  const formattedEndTime = isRunning ? 'Still running...' : formatExecutionDate(endTime);
  const formattedDuration = duration ? ` - ${duration}` : '';

  const value = `${formattedStartTime} | + ${formattedEndTime} + ${formattedDuration}`;

  return <StyledExecutionStartEndDate>{value}</StyledExecutionStartEndDate>;
};
