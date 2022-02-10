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
  .ant-menu-item {
    border-top: 1px solid var(--color-gray-nonary);

    &:last-child {
      .ant-menu-item {
        border-bottom: 1px solid var(--color-gray-nonary);
      }
    }
  }
`;

export const StyledSider = styled(Layout.Sider)`
  position: fixed;
  overflow: hidden;
  z-index: 1;

  height: 100vh;
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
