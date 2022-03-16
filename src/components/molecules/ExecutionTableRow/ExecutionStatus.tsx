import {ReactComponent as SuccessStatusIcon} from '@assets/check.svg';
import {ReactComponent as PendingStatusIcon} from '@assets/clock.svg';
import {ReactComponent as ErrorStatusIcon} from '@assets/times.svg';

import {StyledExecutionStatus} from './ExecutionTableRow.styled';

const statusesIcons: any = {
  success: <SuccessStatusIcon />,
  error: <ErrorStatusIcon />,
  pending: <PendingStatusIcon />,
};

export const ExecutionStatus = (props: any) => {
  const {status} = props;

  return <StyledExecutionStatus>{statusesIcons[status]}</StyledExecutionStatus>;
};
