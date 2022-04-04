import {Spin} from 'antd';

import styled from 'styled-components';

export const StyledAntdSpin = styled(Spin)<{isCentered: boolean}>`
  ${props =>
    props.isCentered
      ? `
  display: flex;
  justify-content: center;
  align-items: center;`
      : ''}
`;
