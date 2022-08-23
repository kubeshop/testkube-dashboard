import styled from 'styled-components';

import Colors from '@styles/Colors';

export const SummaryGridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 12px;
`;

export const SummaryGridItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 100px;
  padding: 20px;
  border-radius: 4px;

  background: ${Colors.slate800};

  transition: 0.3s;

  &:hover {
    background: ${Colors.slate800halfalpha};
  }
`;
