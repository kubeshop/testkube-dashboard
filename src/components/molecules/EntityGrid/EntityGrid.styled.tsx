import styled from 'styled-components';

import Colors from '@styles/Colors';

export const StyledEntityGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
`;

export const StyledEntityGridItem = styled.div`
  height: 120px;
  padding: 20px;
  border: 1px solid transparent;
  border-radius: 4px;

  background: ${Colors.slate800};

  cursor: pointer;
  transition: 0.3s;

  &:hover {
    border: 1px solid ${Colors.indigo400};

    background: ${Colors.da};
  }
`;
