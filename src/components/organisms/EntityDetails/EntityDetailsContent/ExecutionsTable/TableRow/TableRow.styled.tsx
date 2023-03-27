import styled from 'styled-components';

import {Text} from '@custom-antd';

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

export const StatusText = styled(Text)`
  &.testkube-text.small {
    line-height: 40px;
  }
`;
