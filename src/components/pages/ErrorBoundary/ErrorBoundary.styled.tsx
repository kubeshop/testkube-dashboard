import {Image, Space} from 'antd';

import styled from 'styled-components';

import Colors from '@styles/Colors';

export const StyledErrorImage = styled(Image)``;

export const StyledErrorContainer = styled(Space)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  margin: auto;
  width: 40vw;
  height: 100%;

  text-align: center;
`;

export const StyledErrorDescription = styled.span`
  color: ${Colors.slate300};
  text-align: center;
  width: 100%;

  font-size: 18px;
  font-weight: 400;
`;
