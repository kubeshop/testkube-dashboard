import {Input} from 'antd';

import styled from 'styled-components';

import {maxDevice} from '@src/styles/MediaQueries';

export const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  width: 100%;
  margin: 8px 0px 24px 0px;

  & > * {
    flex: 1 1 auto;
    min-width: 160px;
    max-width: 248px;
  }

  @media ${maxDevice.tablet} {
    width: 100%;

    & > * {
      width: 100%;
    }
  }
`;

export const SearchInput = styled(Input)`
  height: 46px;
  width: auto;
`;
