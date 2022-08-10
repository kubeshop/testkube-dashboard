import styled from 'styled-components';

import Colors from '@styles/Colors';
import {invisibleScroll} from '@styles/globalStyles';

export const MetricsBarChartWrapper = styled.div<{$svgWrapperWidth: number; $midVal: number}>`
  position: relative;

  display: flex;
  align-items: center;

  min-height: 200px;
  height: 200px;

  &:after {
    position: absolute;
    top: 10px;
    left: 0%;

    content: 'Middle duration: ${({$midVal}) => $midVal}s';
  }
`;

export const ChartWrapper = styled.div<{$svgWrapperWidth: number; $isHover: boolean}>`
  position: relative;
  overflow-x: ${({$isHover}) => ($isHover ? 'visible' : 'auto')};

  ${invisibleScroll}

  height: 80%;

  width: ${({$svgWrapperWidth}) => $svgWrapperWidth}px;
  min-width: 100%;

  &:before {
    position: absolute;
    bottom: 80%;

    content: '';
    width: ${({$svgWrapperWidth}) => $svgWrapperWidth}px;
    min-width: 100%;
    height: 1px;

    border-top: 1px dashed ${Colors.indigo300};
  }
`;

export const SvgWithTooltipWrapper = styled.div<{$left: number}>`
  .ant-tooltip {
    top: 0% !important;
    left: ${({$left}) => $left}px !important;
  }
`;

export const MiddleValueLine = styled.div`
  position: absolute;
  top: 20%;

  height: 1px;

  border-top: 1px dashed ${Colors.indigo300};
`;

export const SvgWrapper = styled.svg``;
