import {Button, Layout} from 'antd';

import styled from 'styled-components';

import Colors from '@styles/Colors';
import Fonts from '@styles/Fonts';

export const StyledMainContent = styled(Layout.Content)`
  display: flex;
  flex-direction: column;
  background: var(--color-dark-tertiary);
`;

export const StyledTestSummary = styled.div`
  position: relative;
  top: 24px;
  margin-right: 10px;

  // TESTING DIFFERENT SCREENS

  /* @media only screen and (min-width: 425px) {
    height: 50vh;
  }
  @media only screen and (min-width: 768px) {
    height: 55vh;
  }
  @media only screen and (min-width: 1024px) {
    height: 64vh;
  }
  @media only screen and (min-width: 1440px) {
    height: 72vh;
  }
  @media only screen and (min-width: 2500px) {
    height: 83vh;
  } */
`;

export const StyledLayoutContentWrapper = styled(Layout)`
  height: 100vh;
  padding-left: 80px;
`;

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
