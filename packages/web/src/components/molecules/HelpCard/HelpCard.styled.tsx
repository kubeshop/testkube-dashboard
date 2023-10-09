import styled from 'styled-components';

import Colors from '@styles/Colors';

export const StyledHelpCardContainer = styled.div<{isLink?: boolean}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 19px;

  transition: background-color 0.5s ease;

  border-radius: 4px;
  padding: 14px 15px;
  width: 100%;

  background-color: ${Colors.slate800};
  cursor: ${props => (props.isLink ? 'pointer' : 'default')};

  font-size: 12px;
  color: ${Colors.slate200};

  &:hover {
    background-color: ${Colors.slate801};
  }
`;

export const StyledChildrenContainer = styled.div`
  flex: 1 1 460px;
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

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;

  svg {
    path {
      fill: ${Colors.slate50};
    }
  }
`;
