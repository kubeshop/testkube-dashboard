// import {Spin} from 'antd';
import {ExecutionStepIconType} from '@models/executions';

import {Loader} from '@atoms';

import {ReactComponent as SuccessStatusIcon} from '@assets/check.svg';
import {ReactComponent as PendingStatusIcon} from '@assets/clock.svg';
import {ReactComponent as CodeIcon} from '@assets/code.svg';
import {ReactComponent as ErrorStatusIcon} from '@assets/times.svg';

import {StyledExecutionStepIcon} from './ExecutionStepIcon.styled';

const icons: {[key in ExecutionStepIconType]: any} = {
  passed: <SuccessStatusIcon />,
  success: <SuccessStatusIcon />,
  error: <ErrorStatusIcon />,
  running: <Loader size="small" />,
  code: <CodeIcon />,
  queued: <PendingStatusIcon />,
  waiting: <PendingStatusIcon />,
};

type ExecutionStepIconProps = {
  icon: ExecutionStepIconType;
};

const ExecutionStepIcon: React.FC<ExecutionStepIconProps> = props => {
  const {icon} = props;

  return <StyledExecutionStepIcon>{icons[icon]}</StyledExecutionStepIcon>;
};

export default ExecutionStepIcon;
