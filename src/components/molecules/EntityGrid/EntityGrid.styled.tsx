import styled from 'styled-components';

import Colors from '@styles/Colors';

export const StyledEntityGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(300px, 1fr) minmax(300px, 1fr);
  gap: 32px;

  @media ${maxDevice.laptop} {
    grid-template-columns: 1fr;
  }
`;

export const ItemWrapper = styled.div`
  display: flex;
  align-items: space-between;
  gap: 15px;

  padding: 20px;
  border: 1px solid transparent;
  border-radius: 4px;
  width: 100%;

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
  gap: 12px;

  width: 100%;
`;

export const RowsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 12px;

  padding-left: 40px;
`;

export const ItemRow = styled.div<{$flex: number}>`
  display: flex;
  align-items: center;
  flex: ${({$flex}) => $flex};
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 5px;
`;

export const ItemColumn = styled.div<{$isStretch?: boolean}>`
  overflow: hidden;

  display: flex;
  ${({$isStretch}) => ($isStretch ? 'flex: 1;' : '')};
  gap: 10px;
`;

export const StyledMetricItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex-basis: 115px;

  padding-top: 5px;
`;
