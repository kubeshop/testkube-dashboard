import styled from 'styled-components';

export const StyledDashboardGradient = styled.div<{gradient?: string}>`
  position: absolute;
  top: 0;
  z-index: 1;

  height: 500px;
  width: 100%;

  background: ${props => props.gradient};
`;

export const StyledDashboardBottomGradient = styled.div`
  position: absolute;
  bottom: 0;
  z-index: 2;

  height: 250px;
  width: 100%;

  background: linear-gradient(0.36deg, #151515 59.16%, rgba(21, 21, 21, 0) 96.43%);
`;

export const StyledDashboardContent = styled.div`
  position: relative;
  z-index: 3;

  flex: 1;

  padding: 40px 20px 0px 20px;
`;
