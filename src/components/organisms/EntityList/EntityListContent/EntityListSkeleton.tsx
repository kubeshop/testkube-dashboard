import {Skeleton} from '@custom-antd';

import {StyledEntityListSkeletonWrapper} from './EntityListContent.styled';

const EntityListSkeleton: React.FC = () => {
  const skeletonConfig = {
    additionalStyles: {
      lineHeight: 120,
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
