import {ExpandAltOutlined, FullscreenExitOutlined} from '@ant-design/icons';

import styled from 'styled-components';

import {AnsiClassesMapping} from '@atoms';

import Colors from '@styles/Colors';
import {invisibleScroll} from '@styles/globalStyles';

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
  background-color: ${Colors.slate900};
  overflow: hidden;
`;

export const StyledPreLogText = styled.pre`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  overflow: scroll;

  padding: 10px;
  font-size: 12px;
  margin: 0;

  ${AnsiClassesMapping}
  ${invisibleScroll}
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

export const StyledLogOutputHeaderContainer = styled.div<{$isFullscreen?: boolean}>`
  ${({$isFullscreen}) =>
    $isFullscreen
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
