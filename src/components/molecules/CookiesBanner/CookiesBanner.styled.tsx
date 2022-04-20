import {Button} from 'antd';

import styled from 'styled-components';

import Colors from '@styles/Colors';
import Fonts from '@styles/Fonts';

export const StyledCookiesContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 3;

  display: flex;
  justify-content: center;

  width: calc(100% - 80px);
  padding: 32px 300px;

  background: ${Colors.purple};

  p {
    margin: 0;

    color: white;

    font-size: 16px;
  }
`;

export const StyledCookiesDisclaimer = styled.p`
  width: 500px;

  font-family: ${Fonts.ptSans};
  font-size: 14px;
  font-weight: 400;
`;

export const StyledCookiesButton = styled(Button)`
  color: ${Colors.purple};

  &:hover,
  &:focus {
    border: 1px solid ${Colors.whitePure};

    color: ${Colors.whitePure};
    background: transparent;
  }
`;
