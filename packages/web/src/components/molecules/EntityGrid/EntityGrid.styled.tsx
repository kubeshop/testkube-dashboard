import {LoadingOutlined} from '@ant-design/icons';

import styled from 'styled-components';

import Colors from '@styles/Colors';
import {maxDevice} from '@styles/MediaQueries';

export const StyledEntityGrid = styled.div<{$columns?: number; $itemWidth: number}>`
  display: grid;
  grid-template-columns: ${({$columns, $itemWidth}) =>
    `repeat(${$columns ?? 'auto-fit'}, minmax(${$itemWidth}px, 1fr))`};
  gap: 32px;

  @media ${maxDevice.laptop} {
    grid-template-columns: 1fr;
  }
`;

export const ItemWrapper = styled.div`
  display: flex;
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

  min-width: 100px;
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
  flex-wrap: wrap;

  align-items: center;
`;

export const ExecutionTimeItemColumn = styled(ItemColumn)`
  @media ${maxDevice.mobileL} {
    display: none;
  }
`;

export const StyledMetricItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1 0 115px;

  padding-top: 5px;
`;

export const StyledEntityGridSkeletonWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px 32px;
`;

export const StyledEntityGridLoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  min-height: 80px;
`;

export const LazyLoadingOutlined = styled(LoadingOutlined)`
  animation: 500ms linear opacity-in, 750ms linear spin infinite;
`;
