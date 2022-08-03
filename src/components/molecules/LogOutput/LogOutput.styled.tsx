import styled from 'styled-components';

import Colors from '@styles/Colors';
import {invisibleScroll} from '@styles/globalStyles';

export const StyledLogOutputContainer = styled.div<{$isFullScreen?: boolean}>`
  ${({$isFullScreen}) =>
    $isFullScreen
      ? `
      position: absolute;
      z-index: 999;
      right: 0;
      top: 0;
    `
      : ''};

  overflow-x: auto;

  display: flex;
  flex-direction: column;

  border-radius: ${({$isFullScreen}) => ($isFullScreen ? '0' : '4px')};

  &.full-screen-log-output-enter {
    width: 0;
  }

  &.full-screen-log-output-enter-active {
    width: calc(100% - 80px);

    transition: 0.35s;
  }

  &.full-screen-log-output-enter-done {
    width: calc(100% - 80px);
  }

  &.full-screen-log-output-exit {
    width: calc(100% - 80px);
  }

  &.full-screen-log-output-exit-active {
    width: 0;

    transition: 0.35s;
  }

  &.full-screen-log-output-exit-done {
    display: none;
  }

  ${invisibleScroll}
`;

export const StyledLogTextContainer = styled.div`
  overflow: auto;

  flex: 1;

  background-color: ${Colors.slate900};

  ${invisibleScroll};
`;

export const StyledLogText = styled.span``;

export const StyledPreLogText = styled.pre`
  display: flex;

  padding: 10px;
  font-size: 12px;

  ${invisibleScroll}
`;

export const StyledLogOutputActionsContainer = styled.ul`
  display: flex;
  justify-content: flex-end;
  flex: 1;

  padding: 0;
  margin: 0;

  list-style-type: none;
`;

export const StyledLogOutputHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 8px;
  border-radius: inherit;

  background: ${Colors.slate900};
`;

export const StyledActionIconContainer = styled.li`
  padding: 0 4px;
  border: 1px solid #434343;
  border-radius: 2px;

  background: #141414;

  cursor: pointer;

  &:not(:last-child) {
    margin-right: 8px;
  }

  span {
    svg {
      path {
        transition: 0.3s;
      }
    }
  }

  &:hover {
    span {
      svg {
        path {
          fill: ${Colors.purple};
        }
      }
    }
  }
`;

export const StyledLogOutputHeaderTitle = styled.span`
  font-size: 14px;
  font-style: italic;
  font-weight: 600;
`;
