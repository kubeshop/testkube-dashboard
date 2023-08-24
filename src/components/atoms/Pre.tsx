import {FC, PropsWithChildren} from 'react';

import {StyledPre} from './Pre.styled';

export const Pre: FC<PropsWithChildren<{}>> = props => {
  const {children} = props;

  return <StyledPre>{children}</StyledPre>;
};
