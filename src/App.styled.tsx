import {Layout} from 'antd';

import styled from 'styled-components';

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
  min-height: 100vh;
  padding: 50px 35px 50px 115px;
`;
