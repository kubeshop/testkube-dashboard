import styled from 'styled-components';

import {Coordinates} from '@models/config';

import Colors from '@styles/Colors';
import {maxDevice} from '@styles/MediaQueries';

import {BaseLogOutputStyles} from '../LogOutput.styled';

export const StyledFullscreenLogOutputContainer = styled.div<{
  logOutputDOMRect?: Coordinates;
}>`
  ${BaseLogOutputStyles}

  ${({logOutputDOMRect}) =>
    logOutputDOMRect
      ? `
  position: fixed;
  z-index: 1001;

  color: ${Colors.slate400};

  &.full-screen-log-output-enter {
    top: ${logOutputDOMRect?.top}px;
    left: ${logOutputDOMRect?.left}px;

    width: ${logOutputDOMRect?.width}px;
    height: ${logOutputDOMRect?.height}px;
  }

  &.full-screen-log-output-enter-active,
  &.full-screen-log-output-enter-done {
    top: 0;
    left: 100px;

    width: calc(100% - 100px);
    height: 100%;

    transition:
      top 0.4s ease-in-out,
      left 0.3s ease-in-out 0.4s,
      height 0.4s ease-in-out,
      width 0.3s ease-in-out 0.4s
    ;
  }

  &.full-screen-log-output-exit {
    top: 0;
    left: 100px;

    width: calc(100% - 100px);
    height: 100%;
  }

  &.full-screen-log-output-exit-active {
    top: ${logOutputDOMRect?.top}px;
    left: ${logOutputDOMRect?.left}px;

    width: ${logOutputDOMRect?.width}px;
    height: ${logOutputDOMRect?.height}px;

    transition:
      top 0.2s ease-in-out 0.2s,
      left 0.2s ease-in-out,
      height 0.2s ease-in-out 0.2s,
      width 0.2s ease-in-out
    ;
  }

  &.full-screen-log-output-exit-done {
    top: ${logOutputDOMRect?.top}px;
    left: ${logOutputDOMRect?.left}px;

    width: ${logOutputDOMRect?.width}px;
    height: ${logOutputDOMRect?.height}px;
  }

  @media ${maxDevice.tablet} {
    &.full-screen-log-output-enter-active {
      left: 60px;
      width: calc(100% - 30px);
    }

    &.full-screen-log-output-enter-done {
      left: 60px;
      width: calc(100% - 60px);
    }
  }
  `
      : ''};
`;
