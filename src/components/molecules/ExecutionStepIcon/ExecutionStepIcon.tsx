import {ExecutionStepIconType} from '@models/executions';

import {Loader} from '@atoms';

import {ReactComponent as SuccessStatusIcon} from '@assets/check.svg';
import {ReactComponent as PendingStatusIcon} from '@assets/clock.svg';
import {ReactComponent as CodeIcon} from '@assets/code.svg';
import {ReactComponent as PersonIcon} from '@assets/personIcon.svg';
import {ReactComponent as ErrorStatusIcon} from '@assets/times.svg';

import {StyledExecutionStepIcon} from './ExecutionStepIcon.styled';

const icons: {[key in ExecutionStepIconType | any]: any} = {
  success: <SuccessStatusIcon />,
  passed: <SuccessStatusIcon />,
  error: <ErrorStatusIcon />,
  failed: <ErrorStatusIcon />,
  pending: <Loader size="small" />,
  running: <Loader size="small" />,
  code: <CodeIcon />,
  queued: <PendingStatusIcon />,
  neverRun: <PersonIcon />,
};

type ExecutionStepIconProps = {
  icon: ExecutionStepIconType;
};

const ExecutionStepIcon: React.FC<ExecutionStepIconProps> = props => {
  const {icon} = props;

  return icons[icon] ? <StyledExecutionStepIcon>{icons[icon]}</StyledExecutionStepIcon> : null;
};

export default ExecutionStepIcon;
