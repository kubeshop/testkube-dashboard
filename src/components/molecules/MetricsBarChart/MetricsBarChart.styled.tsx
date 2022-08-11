import styled from 'styled-components';

import Colors from '@styles/Colors';
import {invisibleScroll} from '@styles/globalStyles';

export const MetricsBarChartWrapper = styled.div`
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
  justify-content: space-between;

  height: inherit;
  width: inherit;
`;

export const BarWrapper = styled.div<{$width?: any; bg?: any}>`
  width: ${({$width}) => $width}px;

  transition: 0.3s;
  cursor: pointer;

  &:not(:last-child) {
    margin-right: 6px;
  }

  &:hover {
    background: ${Colors.slate600} !important;
  }
`;

export const NoData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
`;
