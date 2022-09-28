import styled from 'styled-components';

import Colors from '@styles/Colors';

export const StyledOption = styled.div`
  padding: 6px 12px;

  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${Colors.slate700};
  }
`;

export const StyledMultiLabel = styled.div`
  padding: 3px 5px;
`;
