import styled from 'styled-components';

import Colors from '@styles/Colors';

export const LabelWrapper = styled.div`
  margin-bottom: 12px;
`;

export const StyledCopyCommandContainer = styled.div<{$bg: string; $isBordered?: boolean}>`
  display: flex;
  justify-content: space-between;

  ${({$isBordered}) => ($isBordered ? `border: 1px solid ${Colors.slate800};` : '')}
  border-radius: 4px;

  background-color: ${({$bg}) => $bg};

  span {
    position: relative;
  }

  &:not(:last-child) {
    margin-bottom: 15px;
  }
`;

export const StyledCopyCommandCode = styled.code`
  display: flex;
  align-items: center;

  color: ${Colors.greyCode};

  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  } /* Chrome, Safari and Opera */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  span {
    margin-right: 5px;
    color: ${Colors.slate500};
  }
`;
