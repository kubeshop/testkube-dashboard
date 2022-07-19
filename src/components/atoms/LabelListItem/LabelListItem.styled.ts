import styled from 'styled-components';

import Colors from '@styles/Colors';

export const StyledLabelListItem = styled.li<{isSkippedMode: boolean}>`
  padding: 0px ${props => (props.isSkippedMode ? '0px' : '10px')};
  ${props => (props.isSkippedMode ? '' : `border: 1px solid transparent;`)}
  border-radius: 4px;

  background: rgba(0, 0, 0, 0.3);
  color: ${Colors.slate500};

  font-size: 14px;
  font-weight: 400;
`;
