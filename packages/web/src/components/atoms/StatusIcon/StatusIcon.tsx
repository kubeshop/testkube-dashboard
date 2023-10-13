import {Icon} from '@atoms';

import Colors from '@styles/Colors';

import {IconProps} from '../Icon/types';

import {StyledStatusIcon} from './StatusIcon.styled';

interface IconStyle {
  borderColor: Colors;
  background: Colors;
  color?: Colors;
}

const iconStyles: Record<string, IconStyle> = {
  failed: {
    color: Colors.pink400,
    borderColor: Colors.pink600,
    background: Colors.pink900,
  },
  error: {
    color: Colors.pink400,
    borderColor: Colors.pink600,
    background: Colors.pink900,
  },
  passed: {
    color: Colors.lime300,
    borderColor: Colors.lime600,
    background: Colors.lime900,
  },
  success: {
    color: Colors.lime300,
    borderColor: Colors.lime600,
    background: Colors.lime900,
  },
  running: {
    color: Colors.sky400,
    borderColor: Colors.sky600,
    background: Colors.sky900,
  },
  pending: {
    borderColor: Colors.slate600,
    background: Colors.slate700,
    color: Colors.slate400,
  },
  queued: {
    color: Colors.slate400,
    borderColor: Colors.slate600,
    background: Colors.slate900,
  },
  cancelled: {
    color: Colors.pink400,
    borderColor: Colors.pink600,
    background: Colors.pink900,
  },
  timeout: {
    color: Colors.pink400,
    borderColor: Colors.pink600,
    background: Colors.pink900,
  },
  aborted: {
    color: Colors.pink400,
    borderColor: Colors.pink600,
    background: Colors.pink900,
  },
  aborting: {
    color: Colors.pink400,
    borderColor: Colors.pink600,
    background: Colors.pink900,
  },

  partial_outage: {
    color: Colors.amber400,
    borderColor: Colors.amber600,
    background: Colors.amber900,
  },
  major_outage: {
    color: Colors.pink400,
    borderColor: Colors.pink600,
    background: Colors.pink900,
  },
  operational: {
    color: Colors.lime400,
    borderColor: Colors.lime600,
    background: Colors.lime900,
  },
  unknown: {
    color: Colors.slate400,
    borderColor: Colors.slate600,
    background: Colors.slate900,
  },
};

type StatusIconProps = {
  status: IconProps['name'];
};

const StatusIcon: React.FC<StatusIconProps> = props => {
  const {status} = props;

  return (
    <StyledStatusIcon style={iconStyles[status]}>
      <Icon name={status} />
    </StyledStatusIcon>
  );
};

export default StatusIcon;
