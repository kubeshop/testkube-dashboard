import {Icon} from '@atoms';

import Colors from '@styles/Colors';

import {StyledStatusIcon} from './StatusIcon.styled';

const iconStyles: any = {
  failed: {
    borderColor: Colors.pink600,
    background: Colors.pink900,
  },
  error: {
    borderColor: Colors.pink600,
    background: Colors.pink900,
  },
  passed: {
    borderColor: Colors.lime600,
    background: Colors.lime900,
  },
  running: {
    borderColor: Colors.sky600,
    background: Colors.sky900,
  },
  pending: {
    borderColor: Colors.slate600,
    background: Colors.slate900,
  },
  queued: {
    borderColor: Colors.slate600,
    background: Colors.slate900,
  },
};

const StatusIcon: React.FC<any> = props => {
  const {status} = props;

  return (
    <StyledStatusIcon style={iconStyles[status]}>
      <Icon name={status} />
    </StyledStatusIcon>
  );
};

export default StatusIcon;
