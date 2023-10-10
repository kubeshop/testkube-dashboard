import {Input, InputProps} from 'antd';

import styled from 'styled-components';

export interface ICustomInputProps extends InputProps {
  color?: string;
  width?: string;
}

export const AntdCustomStyledInput = styled(Input)<ICustomInputProps>`
  ${props => (props.width ? `width: ${props.width};` : '')}
  .ant-input {
    ${props => (props.color ? `color: ${props.color};` : '')}
  }
`;
