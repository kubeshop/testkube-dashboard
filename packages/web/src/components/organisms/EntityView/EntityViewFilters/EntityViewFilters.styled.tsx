import styled from 'styled-components';

import {maxDevice} from '@styles/MediaQueries';

export const FiltersContainer = styled.div<{$hasSwitch: boolean}>`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  width: 100%;

  ${({$hasSwitch}) => {
    if ($hasSwitch) {
      return `
        & > *:not(:last-child) {
          flex: 1 1 auto;
          min-width: 160px;
          max-width: 248px;
        }

        & > *:last-child {
          flex: 0 0 auto;
          width: max-content;
        }
      `;
    }

    return `
        & > * {
          flex: 1 1 auto;
          min-width: 160px;
          max-width: 248px;
        }
      `;
  }}

  @media ${maxDevice.tablet} {
    width: 100%;

    & > * {
      width: 100%;
    }
  }
`;
