import {Input, InputProps} from 'antd';

import styled from 'styled-components';

import Colors from '@styles/Colors';
import Fonts from '@styles/Fonts';

export interface ICustomInputProps extends InputProps {
  color?: string;
  width?: string;
}

export const AntdCustomStyledInput = styled(Input)<ICustomInputProps>`
  ${props => (props.width ? `width: ${props.width};` : '')}
  .ant-input {
    color: ${props => (props.color ? props.color : Colors.grey450)}};
    border-color: ${Colors.greyBorder};
    background: ${Colors.grey1000};

    font-size: 14px;
    font-weight: 400;
    font-family: ${Fonts.nunito};

    &:focus,
    &:hover,
    &:active {
      border-color: ${Colors.purple};
      box-shadow: none;
    }
  }
`;
