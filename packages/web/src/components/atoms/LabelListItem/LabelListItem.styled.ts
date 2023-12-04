import styled from 'styled-components';

import Colors from '@styles/Colors';

export const StyledLabelListItem = styled.li<{$type: 'primary' | 'secondary'}>`
  display: flex;
  align-items: center;

  padding: 0 5px;
  border: ${({$type}) => ($type === 'primary' ? `1px solid ${Colors.slate700}` : 'none')};
  border-radius: 4px;

  background-color: ${({$type}) => ($type === 'primary' ? 'transparent' : Colors.slate800)};
  font-size: 12px;
  font-weight: 400;

  max-width: 50vw;
`;
