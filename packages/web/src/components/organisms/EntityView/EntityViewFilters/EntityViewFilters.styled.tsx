import styled from 'styled-components';

import {maxDevice} from '@styles/MediaQueries';

export const FiltersContainer = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;

  & > * {
    width: 296px;
  }

  @media ${maxDevice.tablet} {
    width: 100%;

    & > * {
      width: 100%;
    }
  }
`;
