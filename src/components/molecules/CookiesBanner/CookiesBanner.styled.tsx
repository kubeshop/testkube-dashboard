import {Button} from 'antd';

import styled from 'styled-components';

import Colors from '@styles/Colors';
import Fonts from '@styles/Fonts';

export const StyledCookiesContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 50%;
  transform: translateX(50%);
  z-index: 3;

  display: flex;
  justify-content: center;

  width: 800px;
  padding: 35px 32px;
  border: 1px solid ${Colors.slate700};
  border-bottom-color: transparent;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;

  background: ${Colors.slate800};

  p {
    margin: 0;

    color: white;

    font-size: 16px;
  }
`;

export const StyledCookiesDisclaimer = styled.p`
  font-family: ${Fonts.ptSans};
  font-size: 14px;
  font-weight: 400;
`;

export const StyledCookiesButton = styled(Button)`
  border: 1px solid ${Colors.whitePure};

  color: ${Colors.purple};
  background-color: ${Colors.whitePure};

  &:hover,
  &:focus {
    border: 1px solid ${Colors.whitePure};

    color: ${Colors.whitePure};
    background: transparent;
  }
`;
