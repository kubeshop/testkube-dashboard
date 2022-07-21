import styled from 'styled-components';

import Colors from '@styles/Colors';

export const StyledHelpCardContainer = styled.div<{isLink?: boolean}>`
  display: flex;
  flex-direction: row;
  gap: 19px;

  transition: background-color 0.5s ease;

  border-radius: 4px;
  padding: 14px 15px;

  background-color: ${Colors.slate800};
  cursor: ${props => (props.isLink ? 'pointer' : 'default')};

  font-size: 12px;
  color: ${Colors.slate200};

  &:hover {
    background-color: ${Colors.slate801};
  }
`;

export const StyledChildrenContainer = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 460px;
`;

export const StyledHelpCardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  max-width: 514px;
`;

export const StyledLastHelpCardContainer = styled.div`
  margin-top: 32px;
`;
