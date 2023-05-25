import styled from 'styled-components';

import Colors from '@styles/Colors';

export const StyledContainer = styled.div<{$isDragging?: boolean; $disabled: boolean}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;

  padding: 20px;
  margin-bottom: 12px;

  background: transparent;
  border: 1px solid ${Colors.slate800};
  border-radius: 2px;

  transition: 0.3s all;

  ${props =>
    props.$disabled
      ? ''
      : `
        &:hover {
          background: ${Colors.slate900};
          border: 1px solid ${Colors.indigo400};
        }`}

  ${props =>
    props.$isDragging
      ? `
        background: ${Colors.slate900};
        border: 1px solid ${Colors.indigo400};`
      : ''}

  svg {
    width: 24px;
    height: 24px;
  }
`;

export const StyledNameContainer = styled.div`
  flex: 1;
`;

export const StyledIconsWrapper = styled.div`
  &:hover {
    svg {
      transition: 0.3s all;
      color: ${Colors.indigo400};
    }
  }
`;
