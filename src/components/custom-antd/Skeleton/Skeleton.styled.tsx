import {Skeleton} from 'antd';

import styled from 'styled-components';

export const StyledSkeleton = styled(Skeleton)<{additionalStyles?: any}>`
  &.testkube-skeleton {
    padding-top: ${props => `${props.additionalStyles?.container?.paddingTop || 0}px`};

    .ant-skeleton-content {
      .ant-skeleton-paragraph {
        li {
          height: ${props => `${props.additionalStyles?.lineHeight}px` || 'initial'};
        }
      }
    }
  }
`;
