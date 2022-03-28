import {Spin} from 'antd';

import styled from 'styled-components';

import Colors from '@styles/Colors';

export const StyledAntdSpin = styled(Spin)`
  display: flex;
  justify-content: center;
  align-items: center;

  .ant-spin-dot-item {
    background: ${Colors.purple};
  }
`;
