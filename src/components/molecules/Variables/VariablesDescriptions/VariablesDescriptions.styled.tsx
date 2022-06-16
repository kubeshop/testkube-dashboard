import styled from 'styled-components';

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

export const StyledLink = styled.a`
  width: fit-content;
`;
