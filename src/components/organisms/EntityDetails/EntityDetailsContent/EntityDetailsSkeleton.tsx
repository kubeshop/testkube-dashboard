import {Skeleton} from '@custom-antd';

import {EntityDetailsSkeletonWrapper} from './EntityDetailsContent.styled';

const EntityDetailsSkeleton: React.FC = () => {
  const skeletonConfig = {
    additionalStyles: {
      lineHeight: 50,
    },
  };

  return (
    <EntityDetailsSkeletonWrapper>
      {new Array(3).fill(0).map((_, index) => {
        const key = `skeleton-item-${index}`;

        return <Skeleton key={key} {...skeletonConfig} />;
      })}
    </EntityDetailsSkeletonWrapper>
  );
};

export default EntityDetailsSkeleton;
