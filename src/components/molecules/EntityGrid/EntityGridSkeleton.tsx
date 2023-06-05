import {Skeleton} from '@custom-antd';

import {StyledEntityGridSkeletonWrapper} from './EntityGrid.styled';

interface EntityGridSkeletonProps {
  height?: number;
}

const EntityGridSkeleton: React.FC<EntityGridSkeletonProps> = ({height = 120}) => {
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

export default EntityGridSkeleton;
