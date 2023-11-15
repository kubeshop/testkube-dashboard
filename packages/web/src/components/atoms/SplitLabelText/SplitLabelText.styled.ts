import styled from 'styled-components';

import Colors from '@styles/Colors';

export const SplitLabelTextContainer = styled.div<{$isBordered: boolean}>`
  display: inline-flex;
  gap: 3px;

  ${({$isBordered}) =>
    $isBordered
      ? `
    border: 1px solid ${Colors.slate700};
    &:hover {
      border: 1px solid ${Colors.slate500};
    }
    `
      : ''}
  border-radius: 4px;

  padding: 0 5px;
`;
