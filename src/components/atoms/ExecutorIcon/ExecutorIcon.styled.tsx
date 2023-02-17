import styled from 'styled-components';

export const StyledExecutorIcon = styled.div<{$noWidth: boolean}>`
  width: ${({$noWidth}) => ($noWidth ? 'unset' : '28px')};
  height: ${({$noWidth}) => ($noWidth ? 'unset' : '28px')};

  svg {
    width: 100%;
    height: 100%;
  }
`;
