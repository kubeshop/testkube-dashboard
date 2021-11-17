import styled from 'styled-components';
import {Layout} from 'antd';

// export const StyledSidebar = styled(Layout.Sider)`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   flex-direction: column;
//   height: 100vh;
//   overflow: hidden;
//   z-index: 1000;
//   background: var(--color-dark-secondary);
// `;

// export const StyledBodyContainer = styled.div`
//   display: flex;
// `;

export const StyledMainContent = styled(Layout.Content)`
  display: flex;
  flex-direction: column;
  background: var(--color-dark-tertiary);
`;

export const StyledTestHeader = styled.div`
  /* align-items: flex-end;
  margin-bottom: 24px; */
  /* height: 140px; */
  /* border-top-style: none; */
  /* border-bottom-style: 1px solid var(--color-gray-secondary); */
  /* word-wrap: break-word; */
`;

export const StyledTestSummary = styled.div`
  /* height: 85vh; */
  /* margin-top: 24px; */
  position: relative;
  top: 24px;
  left: 20px;
  margin-right: 55px;

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
