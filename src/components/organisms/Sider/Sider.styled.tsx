import {NavLink} from 'react-router-dom';

import {Layout, Space} from 'antd';

import styled from 'styled-components';

import Colors from '@styles/Colors';

export const StyledLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding-top: 40px;

  a {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 80px;
  }

  svg {
    overflow: visible;
  }
`;

export const StyledOther = styled(Space)`
  padding-bottom: 40px;
`;

export const StyledSider = styled(Layout.Sider)<{$isFullScreenLogOutput?: boolean}>`
  height: 100vh;
  z-index: ${({$isFullScreenLogOutput}) => ($isFullScreenLogOutput ? '1002' : '1')};

  .ant-layout-sider-children {
    display: flex;
    justify-content: center;
  }
`;

export const StyledSiderChildContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100px;
  height: 100vh;
  overflow: auto;
`;

export const StyledNavigationMenu = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledNavLink = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 50px;

  svg {
    fill: #64748b;
  }

  &.active,
  &:hover {
    svg {
      fill: ${Colors.whitePure};

      transition: 0.3s all;
    }
  }
`;

export const StyledOtherItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  transition: 0.3s;

  svg {
    width: 20px;
    height: 20px;

    fill: #64748b;

    cursor: pointer;

    &:hover {
      fill: ${Colors.whitePure};

      transition: 0.3s all;
    }
  }

  &.active {
    svg {
      fill: ${Colors.whitePure};

      transition: 0.3s all;
    }
  }
`;
