import {FC} from 'react';

import {FullWidthSpaceProps, StyledSpace} from './FullWidthSpace.styled';

export const FullWidthSpace: FC<FullWidthSpaceProps> = props => {
  const {justify = 'flex-start', ...rest} = props;

  return <StyledSpace $justify={justify} {...rest} />;
};
