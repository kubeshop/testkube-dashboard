import Colors from '@styles/Colors';

import Icon from '../Icon/Icon';
import {StyledStatusIcon} from './StatusIcon.styled';

const iconStyles: any = {
  failed: {
    borderColor: Colors.pink600,
    background: Colors.pink900,
  },
  passed: {
    borderColor: Colors.lime600,
    background: Colors.lime900,
  },
};

const StatusIcon: React.FC<any> = props => {
  const {status} = props;

  return (
    <StyledStatusIcon style={iconStyles[status]}>
      <Icon name="failed" />
    </StyledStatusIcon>
  );
};

export default StatusIcon;
