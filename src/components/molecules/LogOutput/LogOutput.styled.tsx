import {ExpandAltOutlined, FullscreenExitOutlined} from '@ant-design/icons';

import styled from 'styled-components';

import {AnsiClassesMapping} from '@atoms';

import Colors from '@styles/Colors';
import {invisibleScroll} from '@styles/globalStyles';

export const BaseLogOutputStyles = `
  display: flex;
  flex-direction: column;

  overflow: auto;

  ${invisibleScroll}
`;

export const LogOutputWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const StyledLogOutputContainer = styled.div`
  position: relative;
  max-height: 100%;
  flex: 1;
  border-radius: 4px;
  overflow: auto;
  ${invisibleScroll}
`;

export const StyledLogTextContainer = styled.div<{bannerVisible?: boolean}>`
  height: 100%;
  flex: 1;
  background-color: ${Colors.slate900};

  ${BaseLogOutputStyles}
`;

export const StyledPreLogText = styled.pre`
  display: flex;
  flex-direction: column;
  overflow: initial;

  padding: 10px;
  font-size: 12px;

  ${AnsiClassesMapping}
`;

export const StyledLogOutputActionsContainer = styled.ul`
  position: sticky;
  display: flex;
  justify-content: flex-end;
  flex: 1;

  padding: 0;
  margin: 0;

  list-style-type: none;
`;

export const StyledLogOutputHeaderContainer = styled.div<{$isFullScreen?: boolean}>`
  ${({$isFullScreen}) =>
    $isFullScreen
      ? `
  position: absolute;
  right: 0;

  z-index: 1002;

  color: ${Colors.slate400};
  `
      : `
  position: relative;
  float: right;
  `}

  display: flex;
  justify-content: space-between;

  border-radius: inherit;

  background: transparent;
`;

const FullscreenIconBaseStyles = `
  position: absolute;
  right: 35px;

  border-radius: 2px;

  padding: 4px;
  margin: 6px;

  font-size: 22px;
`;

export const StyledFullscreenExitOutlined = styled(FullscreenExitOutlined)`
  ${FullscreenIconBaseStyles}

  border: 1px solid transparent;
  transition: 0.3s;

  &:hover {
    border-color: ${Colors.indigo400};
  }
`;

export const StyledExpandAltOutlined = styled(ExpandAltOutlined)`
  ${FullscreenIconBaseStyles}

  border: 1px solid transparent;
  transition: 0.3s;

  &:hover {
    border-color: ${Colors.indigo400};
  }
`;

export const DrawerBannerContainer = styled.div`
  margin-bottom: 30px;
`;
