import {NavLink} from 'react-router-dom';

import {Col, Layout, Menu, Space} from 'antd';

import styled from 'styled-components';

import Colors from '@styles/Colors';

export const StyledMenu = styled(Menu)`
  display: flex;
  flex-direction: column;

  height: inherit;

  background: var(--color-dark-secondary) !important;
`;

export const StyledMenuItem = styled(Menu.Item)``;

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

export const StyledNavigation = styled.div`
  a {
    .ant-menu-item {
      border-top: 1px solid var(--color-gray-nonary);
    }

    &:last-child {
      .ant-menu-item {
        border-bottom: 1px solid var(--color-gray-nonary);
      }
    }
  }
`;

export const StyledOther = styled(Space)`
  padding-bottom: 40px;
`;

export const StyledSider = styled(Layout.Sider)`
  z-index: 1;
`;

export const StyledSiderChildContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: inherit;
`;

export const StyledCol = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  flex: 1;

  a.active {
    .ant-menu-item {
      background: ${Colors.blue6};
    }
  }

  .ant-menu-item {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 60px;
    width: 80px;
    margin: 0;
    padding: 0;

    &:not(:last-child) {
      margin: 0;
    }

    .ant-menu-title-content {
      margin: 0;
    }

    svg {
      fill: #fff;
    }
  }
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
