import styled from 'styled-components';

import Colors, {SecondaryStatusColors, StatusColors} from '@styles/Colors';
import {invisibleScroll} from '@styles/globalStyles';

export const MetricsBarChartWrapper = styled.div<{
  $isDetailsView?: boolean;
}>`
  ${props => (props.$isDetailsView ? 'min-height: 160px;' : '')}
`;

export const BarsWrapper = styled.div<{
  $isDetailsView?: boolean;
}>`
  overflow-x: auto;
  overflow-y: hidden;

  ${invisibleScroll}

  ${({$isDetailsView}) =>
    // Ensure that axis is visible for details
    $isDetailsView ? 'margin-left: 30px;' : ''}
`;

export const ChartWrapper = styled.div<{
  $wrapperWidth: number;
  $isDetailsView?: boolean;
}>`
  position: relative;
  overflow-y: hidden;

  ${invisibleScroll}

  ${({$isDetailsView, $wrapperWidth}) => ($isDetailsView ? '' : `width: ${$wrapperWidth}px;`)}
  min-width: 100%;
`;

export const HorizontalAxis = styled.div<{$top: number; label?: string}>`
  position: absolute;
  top: ${({$top}) => $top}px;

  width: 100%;
  height: 1px;

  border-top: 1px ${props => (props.label ? 'dashed' : 'solid')} ${Colors.indigo300};

  pointer-events: none;
`;

export const AxisLabel = styled.div<{$top: number}>`
  position: absolute;

  top: ${({$top}) => $top}px;

  pointer-events: none;
`;

export const SvgWrapper = styled.div<{$isDetailsView?: boolean}>`
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: nowrap;
  align-items: flex-end;
  width: fit-content;

  ${props => (props.$isDetailsView ? 'padding-bottom: 50px;' : '')}
  ${props => (props.$isDetailsView ? 'padding-left: 75px;' : '')}
`;

export const BarWrapper = styled.div<{$margin: number}>`
  &:not(:last-child) {
    margin-right: ${props => props.$margin}px;
  }
`;

export const ClickableBar = styled.div<{
  $color: StatusColors;
  hoverColor: SecondaryStatusColors;
}>`
  position: relative;
  transition: 0.3s background-color linear;
  cursor: pointer;
  margin-right: 3px;

  background-color: ${props => props.$color};
  border-bottom: 3px solid ${props => props.$color};

  &:hover {
    background-color: ${props => props.hoverColor} !important;
  }
`;

export const StyledPopoverContainer = styled.div`
  display: flex;
  flex-direction: column;

  padding: 12px 16px;

  border-radius: 4px;

  cursor: pointer;
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

export const BarDate = styled.div.attrs<{$height: number}>(({$height}) => ({
  style: {top: `${$height + 15}px`},
}))<{$height: number}>`
  position: absolute;
  left: -5px;
  color: ${Colors.slate400};
  font-size: 12px;

  white-space: nowrap;

  rotate: 45deg;
`;
