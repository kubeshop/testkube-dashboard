import {ReactNode} from 'react';

import styled from 'styled-components';

import Colors from '@styles/Colors';

export const addWidth = 32;
export const addHeight = 46;
export const itemWidth = 300;
export const itemHeight = 68;

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

  padding-top: 7px;

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

export const TestNodeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  gap: 12px;

  width: ${itemWidth}px;
  height: ${itemHeight}px;
  padding: 20px;

  border-radius: 4px;

  background-color: ${Colors.slate800};
`;

export const TestNodeNameContainer = styled.div`
  overflow: hidden;
  margin-right: auto;
`;

export const IntersectionContainer = styled.div`
  border-radius: 10px;
  padding: 12px;
  width: ${addWidth}px;
  height: ${addHeight}px;

  background-color: ${Colors.slate800};

  cursor: pointer;

  &:hover {
    background-color: ${Colors.slate700};
  }

  transition: 0.3s all;
`;

export const ReactFlowContainer = styled.div`
  width: 100%;
  height: 400px;
`;
