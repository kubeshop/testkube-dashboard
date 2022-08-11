import styled from 'styled-components';

import Colors from '@styles/Colors';
import {invisibleScroll} from '@styles/globalStyles';

export const MetricsBarChartWrapper = styled.div<{$svgWrapperWidth: number}>`
  min-height: 200px;
  height: 200px;

  &:after {
    position: absolute;
    top: 10px;
    left: 0%;
  }
`;

export const ChartWrapper = styled.div<{$svgWrapperWidth: number}>`
  ${invisibleScroll}

  width: ${({$svgWrapperWidth}) => $svgWrapperWidth}px;
  min-width: 100%;
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
