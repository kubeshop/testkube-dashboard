import {AutoComplete as AntAutoComplete, AutoCompleteProps} from 'antd';

import styled from 'styled-components';

export interface ICustomAutoCompleteProps extends AutoCompleteProps {
  color?: string;
  width?: string;
}

export const AutoComplete = styled(AntAutoComplete)<ICustomAutoCompleteProps>`
  ${props => (props.width ? `width: ${props.width};` : '')}
  .ant-input {
    ${props => (props.color ? `color: ${props.color};` : '')}
  }
`;

export const EmptyButton = styled.div`
  width: 45px;
`;

export const KeyValueRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;
