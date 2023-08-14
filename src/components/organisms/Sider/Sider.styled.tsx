import {Layout, Space} from 'antd';

import styled from 'styled-components';

import Colors from '@styles/Colors';
import {maxDevice} from '@styles/MediaQueries';

import SiderLink from './SiderLink';

export const StyledLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

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

  @media ${maxDevice.tablet} {
    zoom: 1.35;
  }
`;

export const StyledSider = styled(Layout.Sider)<{$isFullScreenLogOutput?: boolean}>`
  z-index: ${({$isFullScreenLogOutput}) => ($isFullScreenLogOutput ? '1002' : '1')};

  .ant-layout-sider-children {
    display: flex;
    align-items: stretch;
    flex: 1 auto;
    flex-direction: column;
  }

  @media ${maxDevice.tablet} {
    zoom: 0.6;
  }
`;

export const StyledSiderChildContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding-top: 30px;
  width: 100px;
  min-height: 100%;
  overflow: auto;
  top: 0;
  bottom: 0;
`;

export const StyledNavigationMenu = styled.div`
  display: flex;
  flex-direction: column;

  @media ${maxDevice.tablet} {
    zoom: 1.35;
  }
`;

export const StyledSiderLink = styled(SiderLink)`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 50px;

  svg {
    fill: #64748b;
  }

  &.settings-icon {
    svg {
      width: 30px;
      height: 30px;
    }
  }

  &.active,
  &:hover {
    svg {
      fill: ${Colors.whitePure};

      transition: 0.3s all;
    }
  }
`;

export const StyledOtherItem = styled.div<{
  $size: number;
}>`
  display: flex;
  justify-content: center;
  align-items: center;

  transition: 0.3s;

  svg {
    width: ${({$size}) => $size}px;
    height: ${({$size}) => $size}px;

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

export const DropdownListItem = styled.li`
  display: flex;
  align-items: center;

  height: 50px;

  cursor: pointer;
  transition: 0.3s;

  a {
    flex: 1;

    padding: 14px;

    &:hover {
      .testkube-text {
        color: ${Colors.whitePure};
      }

      svg {
        path {
          fill: ${Colors.whitePure};

          transition: 0.3s;
        }
      }
    }
  }
`;
