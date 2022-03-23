import {ReactComponent as SuccessStatusIcon} from '@assets/check.svg';
import {ReactComponent as PendingStatusIcon} from '@assets/clock.svg';
import {ReactComponent as CodeIcon} from '@assets/code.svg';
import {ReactComponent as ErrorStatusIcon} from '@assets/times.svg';

import {ExecutionStepIconType} from '@src/models/executions';

import {StyledExecutionStatus} from './ExecutionTableRow.styled';

const icons: {[key in ExecutionStepIconType]: any} = {
  success: <SuccessStatusIcon />,
  error: <ErrorStatusIcon />,
  pending: <PendingStatusIcon />,
  code: <CodeIcon />,
};

type ExecutionStatusProps = {
  icon: ExecutionStepIconType;
};

export const ExecutionStatus: React.FC<ExecutionStatusProps> = props => {
  const {icon} = props;

  return <StyledExecutionStatus>{icons[icon]}</StyledExecutionStatus>;
};
