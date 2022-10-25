import {Skeleton} from '@custom-antd';

import {EntityDetailsSkeletonWrapper} from './EntityDetailsContent.styled';

const EntityDetailsSkeleton: React.FC = () => {
  const skeletonConfig = {
    paragraph: {
      rows: 1,
      width: '100%',
    },
    additionalStyles: {
      lineHeight: 50,
    },
  };

  return (
    <EntityDetailsSkeletonWrapper>
      {new Array(3).fill(0).map((_, index) => {
        const key = `skeleton-item-${index}`;

        return <Skeleton loading title={false} key={key} {...skeletonConfig} />;
      })}
    </EntityDetailsSkeletonWrapper>
  );
};

export default EntityDetailsSkeleton;
