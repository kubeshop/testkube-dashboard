import {PropsWithChildren} from 'react';

import {StyledPre} from './Pre.styled';

const Pre: React.FC<PropsWithChildren<{}>> = props => {
  const {children} = props;

  return <StyledPre>{children}</StyledPre>;
};

export default Pre;
