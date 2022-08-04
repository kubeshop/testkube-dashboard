import {Typography} from 'antd';

import styled from 'styled-components';

export const StyledText = styled(Typography.Text)<{$color?: string}>`
  &.testkube-text {
    color: ${({$color}) => $color};

    &.biggest {
      font-size: 34px;
      line-height: 30px;
    }

    &.big {
      font-size: 18px;
      line-height: 24px;
    }

    &.middle {
      font-size: 14px;
      line-height: 20px;
    }

    &.small {
      font-size: 12px;
      line-height: 16px;
    }
  }
`;
