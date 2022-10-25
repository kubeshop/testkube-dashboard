import {Skeleton} from '@custom-antd';

import {StyledEntityListSkeletonWrapper} from './EntityListContent.styled';

const EntityListSkeleton: React.FC = () => {
  const skeletonConfig = {
    paragraph: {
      rows: 1,
      width: '100%',
    },
    additionalStyles: {
      lineHeight: 120,
    },
  };

  return (
    <StyledEntityListSkeletonWrapper>
      {new Array(6).fill(0).map((_, index) => {
        const key = `skeleton-item-${index}`;

        return <Skeleton title={false} key={key} {...skeletonConfig} />;
      })}
    </StyledEntityListSkeletonWrapper>
  );
};

export default EntityListSkeleton;
