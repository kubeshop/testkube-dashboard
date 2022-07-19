import styled from 'styled-components';

import Colors from '@styles/Colors';

export const StyledHelpCardContainer = styled.div<{isLink?: boolean}>`
  display: flex;
  flex-direction: row;
  gap: 19px;

  transition: background-color 0.5s ease;

  border-radius: 4px;
  height: 44px;
  width: 100%;
  padding: 14px 15px;

  background-color: ${Colors.slate800};
  cursor: ${props => (props.isLink ? 'pointer' : 'default')};

  font-size: 12px;
  color: ${Colors.slate200};

  &:hover {
    background-color: ${Colors.slate900};
  }
`;

export const StyledChildrenContainer = styled.div`
  flex: 1;
`;
