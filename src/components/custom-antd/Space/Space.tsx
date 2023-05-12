import {SpaceProps} from 'antd';

import {StyledSpace} from './Space.styled';

const Space: React.FC<SpaceProps> = props => {
  return <StyledSpace {...props} />;
};

export default Space;
