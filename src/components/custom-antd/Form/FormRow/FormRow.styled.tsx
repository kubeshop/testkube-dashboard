import styled from 'styled-components';

export const FormRowWrapper = styled.div<{$justify: string}>`
  display: flex;
  justify-content: ${({$justify}) => $justify};
  gap: 10px;
`;
