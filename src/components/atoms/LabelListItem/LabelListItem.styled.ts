import styled from 'styled-components';

import Colors from '@styles/Colors';

export const StyledLabelListItem = styled.li<{isSkippedMode: boolean}>`
  margin: auto;
  padding: 0px ${props => (props.isSkippedMode ? '0px' : '10px')};
  ${props => (props.isSkippedMode ? '' : `border: 1px solid ${Colors.slate700};`)}
  border-radius: 4px;

  background: transparent;

  font-size: 12px;
  font-weight: 400;
`;
