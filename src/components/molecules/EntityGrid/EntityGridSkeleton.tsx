import {FC} from 'react';

import {Skeleton} from '@custom-antd/Skeleton';

import {StyledEntityGridSkeletonWrapper} from '@molecules/EntityGrid.styled';

interface EntityGridSkeletonProps {
  height?: number;
}

export const EntityGridSkeleton: FC<EntityGridSkeletonProps> = ({height = 120}) => {
  const skeletonConfig = {
    additionalStyles: {
      lineHeight: height,
    },
  };

  return (
    <StyledEntityGridSkeletonWrapper>
      {new Array(6).fill(0).map((_, index) => {
        const key = `skeleton-item-${index}`;

        return <Skeleton key={key} {...skeletonConfig} />;
      })}
    </StyledEntityGridSkeletonWrapper>
  );
};
