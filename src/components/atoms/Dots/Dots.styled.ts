import styled from 'styled-components';

export const DotsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: inherit;
  width: 25px;
`;

export const Dot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${props => props.color};

  &:not(:last-child) {
    margin-right: 2px;
  }
`;
