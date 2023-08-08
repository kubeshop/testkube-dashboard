import styled from 'styled-components';

import Colors from '@styles/Colors';
import {maxDevice, minDevice} from '@styles/MediaQueries';

export const StyledNavigationOptionContainer = styled.div`
  cursor: pointer;

  &:hover {
    span {
      color: ${Colors.slate50} !important;
      transition: color 0.2s ease-in-out;
    }
  }
`;

export const StyledNavigationContainer = styled.div`
  position: sticky;
  top: 40px;

  display: flex;
  flex-direction: column;
  gap: 16px;

  min-width: 200px;
`;
