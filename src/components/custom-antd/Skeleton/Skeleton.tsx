import {Skeleton as AntdSkeleton, SkeletonProps as AntdSkeletonProps} from 'antd';

const Skeleton: React.FC<AntdSkeletonProps> = props => {
  const {children, active = true} = props;

  if (children) {
    return (
      <AntdSkeleton active={active} {...props}>
        {children}
      </AntdSkeleton>
    );
  }

  return <AntdSkeleton active={active} {...props} />;
};

export default Skeleton;
