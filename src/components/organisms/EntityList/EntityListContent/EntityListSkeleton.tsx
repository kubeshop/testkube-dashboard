import {Skeleton} from '@custom-antd';

import {StyledEntityListSkeletonWrapper} from './EntityListContent.styled';

interface EntityListSkeletonProps {
  height?: number;
}

const EntityListSkeleton: React.FC<EntityListSkeletonProps> = ({height = 120}) => {
  const skeletonConfig = {
    additionalStyles: {
      lineHeight: height,
    },
  };

  return (
    <StyledEntityListSkeletonWrapper>
      {new Array(6).fill(0).map((_, index) => {
        const key = `skeleton-item-${index}`;

        return <Skeleton key={key} {...skeletonConfig} />;
      })}
    </StyledEntityListSkeletonWrapper>
  );
};

export default EntityListSkeleton;
