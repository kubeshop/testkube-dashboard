import styled from 'styled-components';

import Colors from '@styles/Colors';

export const StyledLabelListItem = styled.li<{isSkippedMode: boolean}>`
  display: flex;
  align-items: center;

  padding: 0px 5px;
  border: 1px solid ${Colors.slate700};
  border-radius: 4px;

  background: transparent;

  font-size: 12px;
  font-weight: 400;
`;
