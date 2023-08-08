import styled from 'styled-components';

import {Text} from '@custom-antd';

import Colors from '@styles/Colors';

export const ItemWrapper = styled.div`
  display: flex;
`;

export const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  margin-left: 15px;
`;

export const ItemRow = styled.div<{$flex: number}>`
  display: flex;
  align-items: center;
  flex: ${({$flex}) => $flex};
  justify-content: space-between;
`;

export const ItemColumn = styled.div`
  display: flex;
  gap: 16px;
`;

export const StatusText = styled(Text)<{$isRunning?: boolean}>`
  &.testkube-text.small {
    display: flex;
    ${({$isRunning}) => ($isRunning ? 'align-items: center;' : 'align-items: flex-start;')}
  }
`;

export const DotsWrapper = styled.div`
  display: flex;
  align-items: center;

  border-radius: 4px;

  transition: background 0.2s ease-in-out;

  &:hover {
    background: ${Colors.slate700};

    cursor: pointer;
  }
`;
