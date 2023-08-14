import styled from 'styled-components';

import {maxDevice} from '@styles/MediaQueries';

export const StyledTabContentContainer = styled.div`
  overflow-x: hidden;

  display: flex;
  flex-direction: column;

  flex: 1;
  gap: 30px;
`;

export const StyledSettingsContainer = styled.div`
  position: relative;

  display: flex;
  flex-direction: row;
  gap: 20px;

  @media ${maxDevice.tablet} {
    flex-direction: column;
  }
`;
