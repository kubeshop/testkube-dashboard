import styled from 'styled-components';

import Colors from '@styles/Colors';

export const StyledLabelsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  padding: 0;
  margin: 0;

  list-style-type: none;
`;

export const LabelsPopover = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  padding: 15px;
  background: ${Colors.slate900};
  border-radius: 4;
`;
