import styled, {css} from 'styled-components';

import {Coordinates} from '@models/config';

import Colors from '@styles/Colors';
import {maxDevice} from '@styles/MediaQueries';

import LogOutputPure from './LogOutputPure';

export const fullscreenLogOutputStyles = css<{$rect?: Coordinates}>`
  position: fixed;
  z-index: 1001;

  color: ${Colors.slate400};

  &.full-screen-log-output-enter {
    top: ${({$rect}) => $rect?.top}px;
    left: ${({$rect}) => $rect?.left}px;

    width: ${({$rect}) => $rect?.width}px;
    height: ${({$rect}) => $rect?.height}px;
  }

  &.full-screen-log-output-enter-active,
  &.full-screen-log-output-enter-done {
    top: 0;
    left: 100px;

    width: calc(100% - 100px);
    height: 100%;

    transition: border 0.4s ease-in-out, top 0.4s ease-in-out, left 0.3s ease-in-out 0.4s, height 0.4s ease-in-out,
      width 0.3s ease-in-out 0.4s;
  }

  &.full-screen-log-output-exit {
    top: 0;
    left: 100px;

    width: calc(100% - 100px);
    height: 100%;
  }

  &.full-screen-log-output-exit-active {
    top: ${({$rect}) => $rect?.top}px;
    left: ${({$rect}) => $rect?.left}px;

    width: ${({$rect}) => $rect?.width}px;
    height: ${({$rect}) => $rect?.height}px;

    transition: border 0.4s ease-in-out, top 0.2s ease-in-out 0.2s, left 0.2s ease-in-out, height 0.2s ease-in-out 0.2s,
      width 0.2s ease-in-out;
  }

  &.full-screen-log-output-exit-done {
    top: ${({$rect}) => $rect?.top}px;
    left: ${({$rect}) => $rect?.left}px;

    width: ${({$rect}) => $rect?.width}px;
    height: ${({$rect}) => $rect?.height}px;
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
`;

const FullscreenLogOutput = styled(LogOutputPure)<{$rect?: Coordinates}>`
  ${fullscreenLogOutputStyles}
`;

export default FullscreenLogOutput;
