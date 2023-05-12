import {SpaceProps} from 'antd';

import {StyledSpace} from './FullWidthSpace.styled';

const FullWidthSpace: React.FC<SpaceProps> = props => {
  return <StyledSpace {...props} />;
};

export default FullWidthSpace;
