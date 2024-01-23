import styled from 'styled-components';

export const StyledStatusIcon = styled.div<{$size: 'small' | 'large'}>`
  display: flex;
  justify-content: center;
  align-items: center;

  height: ${({$size}) => ($size === 'large' ? '28px' : '20px')};
  width: ${({$size}) => ($size === 'large' ? '28px' : '20px')};

  border: 1px solid;
  border-radius: 4px;

  span {
    width: ${({$size}) => ($size === 'large' ? '20px' : '12px')};
    height: ${({$size}) => ($size === 'large' ? '20px' : '12px')};
  }
`;
