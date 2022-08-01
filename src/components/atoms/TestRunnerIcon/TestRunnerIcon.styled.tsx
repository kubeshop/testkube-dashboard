import styled from 'styled-components';

export const StyledTestRunnerIcon = styled.div<{$noWidth: boolean}>`
  width: ${({$noWidth}) => ($noWidth ? 'unset' : '24px')};
  height: ${({$noWidth}) => ($noWidth ? 'unset' : '24px')};

  svg {
    width: 100%;
    height: 100%;
  }
`;
