import styled from 'styled-components';

export const DotsContainer = styled.div<{$direction: 'column' | 'row'}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: ${({$direction}) => $direction};

  height: 14px;
`;

export const Dot = styled.div`
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background-color: ${props => props.color};
`;
