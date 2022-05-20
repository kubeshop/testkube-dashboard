import styled from 'styled-components';

import {Button} from '@custom-antd';

import Colors from '@styles/Colors';
import Fonts from '@styles/Fonts';

export const StyledDescriptionText = styled.div`
  color: ${Colors.grey450};
  font-family: ${Fonts.nunito};
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
`;

export const StyledBoldDescription = styled.span`
  font-weight: 700;
`;

export const StyledAddButton = styled(Button)`
  height: 24px;
  width: 96px;
  margin-top: 17px;
  padding: 0;

  border: 1px solid ${Colors.greyBorder};
  border-radius: 2px;

  background: transparent;

  color: ${Colors.grey450};

  &:focus {
    border: 1px solid ${Colors.greyBorder};
    color: ${Colors.grey450};
  }

  &:hover {
    color: ${Colors.purple};
  }
`;

export const StyledLink = styled.a`
  width: fit-content;
`;
