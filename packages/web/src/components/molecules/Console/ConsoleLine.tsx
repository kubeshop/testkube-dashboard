import {FC, PropsWithChildren, memo} from 'react';

import styled from 'styled-components';

export const Line = styled.div`
  position: relative;
  width: 100%;
`;

export const ConsoleLine: FC<PropsWithChildren<{}>> = memo(({children}) => <Line>{children}</Line>);
