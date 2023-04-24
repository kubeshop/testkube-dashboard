import styled from 'styled-components';

import Colors from '@styles/Colors';

export const DotsWrapper = styled.div<{isTransparent?: boolean}>`
  min-width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 1px 0;
  border-radius: 4px;

  background-color: ${props => (props.isTransparent ? 'transparent' : Colors.slate800)};
`;
