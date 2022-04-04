import {formatExecutionDate} from '@utils/formatDate';

import useIsRunning from '@src/hooks/useIsRunning';

import {StyledExecutionStartEndDate} from './ExecutionTableRow.styled';

export const ExecutionStartEndTime: React.FC<any> = props => {
  const {startTime, duration, status} = props;

  const isRunning = useIsRunning(status);
  const formattedStartTime = formatExecutionDate(startTime);
  const formattedDuration = isRunning ? 'Still running...' : `Duration: ${duration}`;

  return (
    <StyledExecutionStartEndDate>
      {formattedStartTime}&nbsp;&nbsp;&nbsp;{formattedDuration}
    </StyledExecutionStartEndDate>
  );
};
