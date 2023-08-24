import styled from 'styled-components';

import {Colors} from '@styles/Colors';

export const VariablesList = styled.ul`
  display: flex;
  flex-direction: column;

  padding: 0;
  margin: 0;

  list-style-type: none;
`;

export const VariablesListItem = styled.ul`
  display: flex;

  padding: 10px 0;
  border-bottom: 2px solid ${Colors.slate700};
`;

export const VariableTypeWrapper = styled.div`
  flex: 1;

  padding-right: 5px;
`;

export const VariableDetailWrapper = styled.div`
  overflow: hidden;

  flex: 2;
`;
