import {Button as AntdButton, ButtonProps as AntdButtonProps} from 'antd';
import {TooltipPlacement} from 'antd/es/tooltip';

import styled from 'styled-components';

import Colors from '@styles/Colors';

export interface ICustomButtonProps extends AntdButtonProps {
  $customType?: 'primary' | 'secondary' | 'tertiary' | 'transparent' | 'warning' | 'github' | 'gitlab';
  $fullWidth?: boolean;
  hidden?: boolean;
  $withPadding?: boolean;
  tooltip?: string;
  tooltipPlacement?: TooltipPlacement;
}

const buttonTypesStyles: Record<string, string> = {
  primary: `
    color: ${Colors.whitePure};
    border-color: transparent;
    background: ${Colors.indigo400};
    &:focus,
    &:hover,
    &:active {
      color: ${Colors.indigo300};
      border-color: ${Colors.indigo400};
      background: transparent;
    }
  `,
  secondary: `
    color: ${Colors.slate300};
    border-color: transparent;
    background: rgba(255, 255, 255, 0.05);
    &:focus,
    &:hover,
    &:active {
      color: ${Colors.indigo50};
      border-color: transparent;
      background: ${Colors.indigo400};
    }
  `,
  tertiary: `
    color: ${Colors.slate300};
    border-color: ${Colors.slate600};
    background: transparent;
    &:focus,
    &:hover,
    &:active {
      color: ${Colors.slate100};
      border-color: ${Colors.indigo400};
      background: transparent;
    }
  `,
  transparent: `
    color: ${Colors.slate300};
    border-color: transparent;
    background: transparent;
    &:focus,
    &:hover,
    &:active {
      color: ${Colors.slate50};
      border-color: transparent;
      background: rgba(255, 255, 255, 0.03);
    }
  `,
  warning: `
    color: ${Colors.whitePure};
    border-color: transparent;
    background: ${Colors.pink600};
    &:focus,
    &:hover,
    &:active {
      color: ${Colors.whitePure};
      border-color: ${Colors.pink600};
      background: transparent;
    }
  `,
  github: `
    color: ${Colors.whitePure};
    border-color: transparent;
    background: ${Colors.slate700};
    &:focus,
    &:hover,
    &:active {
      color: ${Colors.whitePure};
      border-color: ${Colors.slate700};
      background: transparent;
    }
  `,
  gitlab: `
    color: ${Colors.whitePure};
    border-color: transparent;
    background: ${Colors.violet800};
    &:focus,
    &:hover,
    &:active {
      color: ${Colors.whitePure};
      border-color: ${Colors.violet800};
      background: transparent;
    }
  `,
};

export const AntdCustomStyledButton = styled(AntdButton)<ICustomButtonProps>`
  ${props => buttonTypesStyles[props.$customType || 'primary']};

  ${({$withPadding}) => {
    if (!$withPadding) {
      return `
        padding: 0;
        height: unset;
      `;
    }
  }}

  width: ${({$fullWidth}) => ($fullWidth ? '100%' : 'auto')};
`;
