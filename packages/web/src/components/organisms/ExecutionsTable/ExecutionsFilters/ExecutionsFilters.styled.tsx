import {Input} from 'antd';

import styled from 'styled-components';

export const FiltersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(120px, 248px));
  grid-column-gap: 16px;
  align-items: center;
  width: 100%;
  margin: 8px 0px 24px 0px;
`;

export const SearchInput = styled(Input)`
  height: 46px;
  width: auto;
`;
