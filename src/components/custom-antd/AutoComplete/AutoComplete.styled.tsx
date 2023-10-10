import {AutoComplete, AutoCompleteProps} from 'antd';

import styled from 'styled-components';

export interface ICustomAutoCompleteProps extends AutoCompleteProps {
  color?: string;
  width?: string;
}

export const AntdCustomStyledAutoComplete = styled(props => <AutoComplete {...props} />)<ICustomAutoCompleteProps>`
  ${props => (props.width ? `width: ${props.width};` : '')}
  .ant-input {
    ${props => (props.color ? `color: ${props.color};` : '')}
  }
`;
