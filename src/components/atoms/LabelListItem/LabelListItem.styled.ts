import styled from 'styled-components';

import Colors from '@styles/Colors';

export const StyledLabelListItem = styled.li<{isSkippedMode: boolean}>`
  padding: 0px ${props => (props.isSkippedMode ? '0px' : '10px')};
  ${props => (props.isSkippedMode ? '' : `border: 1px solid ${Colors.purple};`)}
  border-radius: 12px;

  color: ${Colors.purple};

  font-size: 14px;
  font-weight: 400;
`;
