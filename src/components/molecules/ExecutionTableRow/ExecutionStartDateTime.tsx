import {memo} from 'react';

import {formatExecutionDate} from '@utils/formatDate';

import {ExecutionTableRowProps} from './ExecutionTableRow';
import {StyledExecutionStartDateTime} from './ExecutionTableRow.styled';

const truncatedExecutionDateFormat = 'DD MMM, hh:mm:ss';

type ExecutionStartDateTimeProps = {
  collapseYear: boolean;
  startTime: ExecutionTableRowProps['startTime'];
};

const ExecutionStartDateTime: React.FC<ExecutionStartDateTimeProps> = props => {
  const {startTime, collapseYear} = props;

  const formattedStartTime = collapseYear
    ? formatExecutionDate(startTime)
    : formatExecutionDate(startTime, truncatedExecutionDateFormat);

  return <StyledExecutionStartDateTime ellipsis>{formattedStartTime}</StyledExecutionStartDateTime>;
};

export default memo(ExecutionStartDateTime);
