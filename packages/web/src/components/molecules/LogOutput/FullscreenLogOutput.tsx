import styled, {css} from 'styled-components';

import {maxDevice} from '@styles/MediaQueries';

import LogOutputPure from './LogOutputPure';

export const fullscreenLogOutputStyles = css`
  position: fixed;
  z-index: 1001;
  top: 0;
  left: 100px;
  width: calc(100% - 100px);
  height: 100%;

  @media ${maxDevice.tablet} {
    left: 60px;
    width: calc(100% - 60px);
  }
`;

export default styled(LogOutputPure)`
  ${fullscreenLogOutputStyles}
`;
