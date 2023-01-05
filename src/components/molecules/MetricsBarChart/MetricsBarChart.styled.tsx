import styled from 'styled-components';

import Colors, {SecondaryStatusColors, StatusColors} from '@styles/Colors';
import {invisibleScroll} from '@styles/globalStyles';

export const MetricsBarChartWrapper = styled.div<{
  $height: number;
  isExtendedPadding: boolean;
  isPaddingRemoved: boolean;
}>`
  overflow-x: auto;
  overflow-y: hidden;

  ${invisibleScroll}

  min-height: ${({$height}) => $height}px;
  height: ${({$height}) => $height}px;

  padding-left: ${props => (props.isExtendedPadding ? '95px' : '65px')};
  padding-top: 5px;
  ${props => (props.isPaddingRemoved ? 'padding: 0;' : '')}
`;

export const ChartWrapper = styled.div<{$wrapperWidth: number}>`
  position: relative;
  overflow-y: hidden;

  ${invisibleScroll}

  height: inherit;
  width: ${({$wrapperWidth}) => $wrapperWidth}px;
  min-width: 100%;
`;

export const HorizontalAxis = styled.div<{$top: number}>`
  position: absolute;
  top: ${({$top}) => $top}%;

  width: 100%;
  height: 1px;

  border-top: 1px dashed ${Colors.indigo300};

  pointer-events: none;
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

export const BarWrapper = styled.div<{$margin: number}>`
  &:not(:last-child) {
    margin-right: ${props => props.$margin}px;
  }
`;

export const ClickableBarWrapper = styled.div<{
  $margin: number;
  $color: StatusColors;
  inactiveColor: SecondaryStatusColors;
}>`
  transition: 0.3s;
  cursor: pointer;

  background-color: ${props => props.inactiveColor};
  border-bottom: 3px solid ${props => props.$color};

  &:not(:last-child) {
    margin-right: ${props => props.$margin}px;
  }

  &:hover {
    background-color: ${props => props.$color} !important;
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
