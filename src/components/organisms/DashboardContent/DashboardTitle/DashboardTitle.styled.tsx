import styled from 'styled-components';

import {Title} from '@custom-antd';

import Fonts from '@styles/Fonts';

export const StyledDashboardTitle = styled(Title)`
  &.dashboard-title {
    font-family: ${Fonts.ptSans};
    font-weight: 300;
  }
  justify-content: space-between;
  display: flex;
`;
