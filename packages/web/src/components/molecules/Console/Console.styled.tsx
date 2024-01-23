import styled, {css} from 'styled-components';

import AnsiClassesMapping from '@atoms/TestkubeTheme/AnsiClassesMapping';

import Colors from '@styles/Colors';
import {invisibleScroll} from '@styles/globalStyles';

export const Container = styled.code<{$wrap?: boolean}>`
  display: block;
  width: 100%;
  height: 100%;
  overflow: auto;

  ${({$wrap}) =>
    $wrap
      ? `
        word-break: break-all;
        white-space: break-spaces;`
      : ''}

  ${AnsiClassesMapping}
  ${invisibleScroll}
`;

export const Content = styled.div`
  width: min-content;
  min-width: 100%;
`;

export const Space = styled.div`
  width: 100%;
`;

export const Line = styled.div<{$highlighted: boolean}>`
  position: relative;
  width: 100%;

  ${({$highlighted}) => ($highlighted ? `background: rgb(255 255 255 / 5%)` : '')}
`;

export const Keyword = styled.span`
  box-shadow: inset 0 -2px 0 0 ${Colors.indigo400};
`;

const hiddenCss = css`
  visibility: hidden;
  opacity: 0;
  user-select: none;
  pointer-events: none;
  overflow: hidden;
`;

export const PlaceholderContainer = styled.div`
  display: none;
  ${hiddenCss}
`;

export const Monitor = styled.iframe`
  border: 0;
  width: 100%;
  height: 100%;
`;

export const HeightMonitor = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 0;
  ${hiddenCss}
`;

export const WidthMonitor = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 0;
  ${hiddenCss}
`;
