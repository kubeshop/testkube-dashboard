import {Typography} from 'antd';

import styled from 'styled-components';

export const StyledTitle = styled(Typography.Title)<{$color?: string}>`
  &.dashboard-title {
    color: ${({$color}) => $color};
  }
`;
