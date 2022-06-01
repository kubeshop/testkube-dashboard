import {memo} from 'react';

import useIsRunning from '@hooks/useIsRunning';

import {ExecutionTableRowProps} from './ExecutionTableRow';
import {StyledExecutionDuration} from './ExecutionTableRow.styled';

type ExecutionDurationProps = {
  duration?: ExecutionTableRowProps['duration'];
  status: ExecutionTableRowProps['status'];
  isTextVisible: boolean;
};

const ExecutionDuration: React.FC<ExecutionDurationProps> = props => {
  const {duration = '', status, isTextVisible} = props;

  const isRunning = useIsRunning(status);
  const formattedDurationText = isRunning ? 'Still running...' : 'Duration: ';

  return (
    <StyledExecutionDuration>{isTextVisible ? formattedDurationText + duration : duration}</StyledExecutionDuration>
  );
};

export default memo(ExecutionDuration);
