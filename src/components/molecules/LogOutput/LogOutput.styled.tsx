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

  // overflow-x: auto;

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
  // overflow: auto;

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

  .ansi-black-fg {
    color: ${Colors.slate600};
  }
  .ansi-bright-black-fg {
    color: ${Colors.slate400};
  }
  .ansi-black-bg {
    color: ${Colors.slate200};
  }

  .ansi-white-fg {
    color: ${Colors.slate400};
  }
  .ansi-bright-white-fg {
    color: ${Colors.slate200};
  }
  .ansi-white-bg {
    color: ${Colors.slate200};
  }

  .ansi-red-fg {
    color: ${Colors.rose500};
  }
  .ansi-bright-red-fg {
    color: ${Colors.rose300};
  }
  .ansi-red-bg {
    color: ${Colors.rose900};
  }

  .ansi-green-fg {
    color: ${Colors.lime500};
  }
  .ansi-bright-green-fg {
    color: ${Colors.lime300};
  }
  .ansi-green-bg {
    color: ${Colors.lime900};
  }

  .ansi-yellow-fg {
    color: ${Colors.yellow500};
  }
  .ansi-bright-yellow-fg {
    color: ${Colors.yellow300};
  }
  .ansi-yellow-bg {
    color: ${Colors.yellow900};
  }

  .ansi-blue-fg {
    color: ${Colors.sky500};
  }
  .ansi-bright-blue-fg {
    color: ${Colors.sky300};
  }
  .ansi-blue-bg {
    color: ${Colors.sky900};
  }

  .ansi-magenta-fg {
    color: ${Colors.pink500};
  }
  .ansi-bright-magenta-fg {
    color: ${Colors.pink300};
  }
  .ansi-magenta-bg {
    color: ${Colors.pink900};
  }

  .ansi-cyan-fg {
    color: ${Colors.cyan500};
  }
  .ansi-bright-cyan-fg {
    color: ${Colors.cyan300};
  }
  .ansi-cyan-bg {
    color: ${Colors.cyan900};
  }
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
