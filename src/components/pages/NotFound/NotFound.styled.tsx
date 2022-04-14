import styled from 'styled-components';

import {Title} from '@custom-antd';

export const StyledNotFoundContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
`;

export const StyledNotFoundTitle = styled(Title)`
  &.not-found-title {
    margin: 0;
  }
`;
