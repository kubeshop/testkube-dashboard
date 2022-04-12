import styled from 'styled-components';

export const StyledLoaderContainer = styled.div<{$isCentered: boolean; $animationDuration: number}>`
  ${props =>
    props.$isCentered
      ? `
  display: flex;
  justify-content: center;
  align-items: center;`
      : ''}

  animation-name: spin;
  animation-duration: ${props => props.$animationDuration}ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
