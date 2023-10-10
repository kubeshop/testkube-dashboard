import {Typography} from 'antd';

import styled from 'styled-components';

export const StyledText = styled(Typography.Text)<{$color?: string}>`
  &.testkube-text {
    color: ${({$color}) => $color};

    transition: 0.3s;

    &.biggest {
      font-size: 34px;
      line-height: 38px;
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

    &.nowrap {
      white-space: nowrap;
    }
  }
`;
