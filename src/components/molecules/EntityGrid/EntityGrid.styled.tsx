import styled from 'styled-components';

import Colors from '@styles/Colors';

export const StyledEntityGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;

  margin-top: 20px;
`;

export const ItemWrapper = styled.div`
  display: flex;

  height: 120px;
  padding: 20px;
  border: 1px solid transparent;
  border-radius: 4px;

  background: ${Colors.slate800};

  cursor: pointer;
  transition: 0.3s;

  &:hover {
    border: 1px solid ${Colors.indigo400};

    background: ${Colors.slate850};
  }
`;

export const DetailsWrapper = styled.div`
  overflow: hidden;

  display: flex;
  flex-direction: column;
  flex: 1;

  margin-left: 15px;
  width: 100%;
`;

export const ItemRow = styled.div<{$flex: number}>`
  display: flex;
  align-items: center;
  flex: ${({$flex}) => $flex};
  justify-content: space-between;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

export const ItemColumn = styled.div`
  display: flex;
  gap: 10px;
`;
