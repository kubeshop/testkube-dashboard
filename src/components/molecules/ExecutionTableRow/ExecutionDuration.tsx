import {memo} from 'react';

import useIsRunning from '@src/hooks/useIsRunning';

import {StyledExecutionDuration} from './ExecutionTableRow.styled';

const ExecutionDuration: React.FC<any> = props => {
  const {duration, status, isTextVisible} = props;

  const isRunning = useIsRunning(status);
  const formattedDurationText = isRunning ? 'Still running...' : 'Duration: ';

  return (
    <StyledExecutionDuration>{isTextVisible ? formattedDurationText + duration : duration}</StyledExecutionDuration>
  );
};

export default memo(ExecutionDuration);
