import styled from 'styled-components';

import Colors, {SecondaryStatusColors, StatusColors} from '@styles/Colors';
import {invisibleScroll} from '@styles/globalStyles';

export const MetricsBarChartWrapper = styled.div<{
  isDetailsView?: boolean;
}>`
  overflow-x: auto;
  overflow-y: hidden;

  ${invisibleScroll}

  ${props => (props.isDetailsView ? 'min-height: 160px;' : '')}
`;

export const ChartWrapper = styled.div<{$wrapperWidth: number}>`
  position: relative;
  overflow-y: hidden;

  ${invisibleScroll}

  width: ${({$wrapperWidth}) => $wrapperWidth}px;
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
`;

export const SvgWrapper = styled.div<{isDetailsView?: boolean}>`
  display: flex;
  align-items: flex-end;

  ${props => (props.isDetailsView ? 'padding-bottom: 50px;' : '')}
  ${props => (props.isDetailsView ? 'padding-left: 75px;' : '')}
`;

export const BarWrapper = styled.div<{$margin: number}>`
  &:not(:last-child) {
    margin-right: ${props => props.$margin}px;
  }
`;

export const ClickableBar = styled.div<{
  $color: StatusColors;
  hoverColor: SecondaryStatusColors;
  isHovered: boolean;
}>`
  transition: 0.3s;
  cursor: pointer;

  background-color: ${props => props.$color};
  border-bottom: 3px solid ${props => props.$color};

  ${props => (props.isHovered ? `background-color: ${props.hoverColor} !important;` : '')}

  &:hover {
    background-color: ${props => props.hoverColor} !important;
  }
`;

export const ClickableBarWrapper = styled.span<{borderTop: number; hoverColor: SecondaryStatusColors}>`
  position: relative;

  border-top: ${props => (props.borderTop ? `${props.borderTop}px` : '1px')} solid transparent;

  padding-right: 3px;

  cursor: pointer;

  &:hover {
    & > ${ClickableBar} {
      background-color: ${props => props.hoverColor} !important;
    }
  }
`;

export const StyledPopoverContainer = styled.div`
  display: flex;
  flex-direction: column;

  padding: 12px 16px;
  
  border-radius: 4px

  background: ${Colors.slate700};

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

export const BarDate = styled.div<{
  $height: number;
}>`
  position: absolute;
  top: ${({$height}) => $height + 15}px;
  left: -5px;

  white-space: nowrap;

  rotate: 45deg;
`;
