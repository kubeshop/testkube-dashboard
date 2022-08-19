import styled from 'styled-components';

import Colors from '@styles/Colors';
import {invisibleScroll} from '@styles/globalStyles';

export const MetricsBarChartWrapper = styled.div<{
  $height: number;
  isExtendedPadding: boolean;
  isPaddingRemoved: boolean;
}>`
  overflow: auto;

  ${invisibleScroll}

  min-height: ${({$height}) => $height}px;
  height: ${({$height}) => $height}px;

  padding-left: ${props => (props.isExtendedPadding ? '95px' : '65px')};
  padding-top: 5px;
  ${props => (props.isPaddingRemoved ? 'padding: 0;' : '')}
`;

export const ChartWrapper = styled.div<{$svgWrapperWidth: number}>`
  position: relative;

  ${invisibleScroll}

  height: inherit;
  width: ${({$svgWrapperWidth}) => $svgWrapperWidth}px;
  min-width: 100%;
`;

export const HorizontalAxis = styled.div<{$top: number}>`
  position: absolute;
  top: ${({$top}) => $top}%;

  width: 100%;
  height: 1px;

  border-top: 1px dashed ${Colors.indigo300};
`;

export const AxisLabel = styled.div<{$top: number; isExtendedPadding: boolean}>`
  position: absolute;

  top: ${({$top}) => $top}%;
  left: ${props => (props.isExtendedPadding ? '-95px' : '-65px')};
`;

export const SvgWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  height: inherit;
  width: inherit;
`;

export const BarWrapper = styled.div<{$width?: any; $margin: number}>`
  width: ${({$width}) => $width}px;

  transition: 0.3s;
  cursor: pointer;

  &:not(:last-child) {
    margin-right: ${props => props.$margin}px;
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

export const StyledPopoverHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;

  margin-bottom: 12px;
`;

export const StyledPopoverContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
`;

export const StyledPopoverContainer = styled.div`
  display: flex;
  flex-direction: column;

  background: ${Colors.slate700};
`;
