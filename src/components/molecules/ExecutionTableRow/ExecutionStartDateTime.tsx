import {memo} from 'react';

import {formatExecutionDate} from '@utils/formatDate';

import {StyledExecutionStartDateTime} from './ExecutionTableRow.styled';

const truncatedExecutionDateFormat = 'DD MMM, hh:mm:ss';

const ExecutionStartDateTime: React.FC<any> = props => {
  const {startTime, maxWidth, collapseYear} = props;
  const formattedStartTime = collapseYear
    ? formatExecutionDate(startTime)
    : formatExecutionDate(startTime, truncatedExecutionDateFormat);

  return (
    <StyledExecutionStartDateTime ellipsis maxWidth={maxWidth}>
      {formattedStartTime}
    </StyledExecutionStartDateTime>
  );
};

export default memo(ExecutionStartDateTime);
