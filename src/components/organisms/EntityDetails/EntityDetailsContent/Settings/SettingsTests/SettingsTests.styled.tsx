import {ReactNode} from 'react';

import styled from 'styled-components';

export const EmptyTestsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;

  padding: 20px 0;
`;

export const StyledOptionWrapper = styled.span`
  display: flex;
  align-items: center;
  gap: 12px;

  svg {
    width: 24px;
    height: 24px;
  }
`;

export const StyledDelayModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  & > div {
    width: 100%;
    border-color: transparent;
  }
`;

export const StyledStepsList = styled.div<{
  isDragging: boolean;
  ref: (element: HTMLElement | null) => void;
  children?: ReactNode;
}>`
  display: flex;
  flex-direction: column;
`;
