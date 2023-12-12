import {FC, PropsWithChildren, memo} from 'react';

import * as S from './Console.styled';

export const ConsoleLine: FC<PropsWithChildren<{}>> = memo(({children}) => (
  <S.Line>
    <span>{children}</span>
    {'\n'}
  </S.Line>
));
