import styled from 'styled-components';

import Colors from '@styles/Colors';
import {invisibleScroll} from '@styles/globalStyles';

export const MetricsBarChartWrapper = styled.div<{$svgWrapperWidth: number}>`
  overflow: auto;
  ${invisibleScroll}

  min-height: 150px;
  height: 150px;
`;

export const ChartWrapper = styled.div<{$svgWrapperWidth: number}>`
  position: relative;

  ${invisibleScroll}

  height: inherit;
  width: ${({$svgWrapperWidth}) => $svgWrapperWidth}px;
  min-width: 100%;
`;

export const MiddleValueLine = styled.div`
  position: absolute;
  top: 20%;

  width: 100%;
  height: 1px;

  border-top: 1px dashed ${Colors.indigo300};
`;

export const SvgWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const BarWrapper = styled.div<{$width?: any; bg?: any}>`
  width: ${({$width}) => $width}px;
  margin-right: 6px;

  background-color: ${({bg}) => bg};

  transition: 0.3s;
  cursor: pointer;

  &:hover {
    background-color: ${Colors.slate600};
  }
`;
