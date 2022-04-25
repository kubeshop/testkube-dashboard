import {SkeletonProps as AntdSkeletonProps} from 'antd';

import {StyledSkeleton} from './Skeleton.styled';

type AdditionalSkeletonStyles = {
  lineHeight?: number;
  container?: {
    paddingTop?: number;
  };
};

type CustomAntdSkeletonProps = {
  additionalStyles?: AdditionalSkeletonStyles;
};

const Skeleton: React.FC<AntdSkeletonProps & CustomAntdSkeletonProps> = props => {
  const {children, active = true} = props;

  if (children) {
    return (
      <StyledSkeleton className="testkube-skeleton" active={active} {...props}>
        {children}
      </StyledSkeleton>
    );
  }

  return <StyledSkeleton className="testkube-skeleton" active={active} {...props} />;
};

export default Skeleton;
