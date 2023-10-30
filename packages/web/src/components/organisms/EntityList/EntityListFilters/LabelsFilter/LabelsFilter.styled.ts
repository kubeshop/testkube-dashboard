import {AutoComplete as AntAutoComplete, AutoCompleteProps} from 'antd';

import styled from 'styled-components';

export const StyledLabelsMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  padding: 24px;
`;

export const StyledKeyValueRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

export const EmptyButton = styled.div`
  width: 45px;
`;

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
