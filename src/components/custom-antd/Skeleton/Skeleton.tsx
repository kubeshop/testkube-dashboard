import {SkeletonProps as AntdSkeletonProps} from 'antd';

import {StyledSkeleton} from './Skeleton.styled';

const Skeleton: React.FC<AntdSkeletonProps> = props => {
  const {children, active = true} = props;

  if (children) {
    return (
      <StyledSkeleton active={active} {...props}>
        {children}
      </StyledSkeleton>
    );
  }

  return <StyledSkeleton active={active} {...props} />;
};

export default Skeleton;
