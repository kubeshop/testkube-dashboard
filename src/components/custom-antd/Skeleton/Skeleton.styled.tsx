import {Skeleton} from 'antd';

import styled from 'styled-components';

import Colors from '@styles/Colors';

export type AdditionalSkeletonStyles = {
  lineHeight?: number;
  color?: string;
  contrastColor?: string;
  container?: {
    paddingTop?: number;
    paddingBottom?: number;
  };
};

export const StyledSkeleton = styled(Skeleton)<{additionalStyles?: AdditionalSkeletonStyles}>`
  &.testkube-skeleton {
    padding-top: ${props => `${props.additionalStyles?.container?.paddingTop || 0}px`};
    padding-bottom: ${props => `${props.additionalStyles?.container?.paddingBottom || 0}px`};

    .ant-skeleton-content {
      .ant-skeleton-paragraph {
        li {
          height: ${props => `${props.additionalStyles?.lineHeight}px` || 'initial'};
        }
      }
    }

    &.ant-skeleton-active {
      .ant-skeleton-paragraph {
        & > li {
          background: ${props => (props.additionalStyles?.color ? props.additionalStyles?.color : Colors.slate800)};

          &::after {
            background: linear-gradient(
              90deg,
              ${props => `${props.additionalStyles?.color ? props.additionalStyles?.color : Colors.slate800}`} 25%,
              ${props =>
                  `${props.additionalStyles?.contrastColor ? props.additionalStyles?.contrastColor : Colors.slate700}`}
                37%,
              ${props => `${props.additionalStyles?.color ? props.additionalStyles?.color : Colors.slate800}`} 63%
            );
          }
        }
      }
    }
  }
`;
