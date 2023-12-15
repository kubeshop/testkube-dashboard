import styled from 'styled-components';

export const StyledExecutorIcon = styled.div<{$size: 'large' | 'small'}>`
  width: ${({$size}) => ($size === 'large' ? '28px' : '16px')};
  height: ${({$size}) => ($size === 'large' ? '28px' : '16px')};

  svg {
    width: 100%;
    height: 100%;
  }
`;
