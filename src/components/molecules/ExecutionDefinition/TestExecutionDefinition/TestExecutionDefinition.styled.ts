import styled from 'styled-components';

import Colors from '@styles/Colors';

export const StyledExecutionDefinitionPre = styled.pre`
  padding: 30px;
  margin-bottom: 0;
  border-radius: 30px;

  background: ${Colors.grey1000};
`;

export const StyledExecutionDefinitionCode = styled.code`
  color: ${Colors.whitePure};

  font-size: 14px;
`;
