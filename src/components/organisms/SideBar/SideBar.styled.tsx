import {NavLink} from 'react-router-dom';

import {Col, Layout, Menu} from 'antd';

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

  height: 120px;

  a {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 80px;
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

export const StyledOther = styled.div`
  padding-bottom: 40px;
`;

export const StyledSider = styled(Layout.Sider)`
  position: fixed;
  overflow: hidden;
  z-index: 1;

  height: 100vh;

  background-color: ${Colors.blackPure};
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

export const StyledNavLink = styled(NavLink)<{gradient: string}>`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  height: 55px;
  padding: 0 15px;

  color: ${Colors.whitePure};

  font-size: 14px;
  font-weight: 400;
  line-height: 16px;

  transition: all 0.3s;

  &.active {
    background: ${props => props.gradient};
  }

  &:hover {
    color: ${Colors.whitePure};

    background: ${props => props.gradient};
  }
`;

export const StyledOtherItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 80px;
  width: 100%;

  border-top: 1px solid ${Colors.grey3};
  border-right: 1px solid ${Colors.grey3};
  border-left: 1px solid ${Colors.grey3};

  cursor: pointer;
  transition: 0.3s;

  &:last-child {
    border-bottom: 1px solid ${Colors.grey3};
  }

  &:hover {
    background-color: ${Colors.grey1000};
  }
`;
