import {FC} from 'react';

import {SkeletonProps as AntdSkeletonProps} from 'antd';

import {AdditionalSkeletonStyles, StyledSkeleton} from './Skeleton.styled';

type CustomAntdSkeletonProps = {
  additionalStyles?: AdditionalSkeletonStyles;
};

export const Skeleton: FC<AntdSkeletonProps & CustomAntdSkeletonProps> = props => {
  const {children, active = true, title = false, paragraph = {rows: 1, width: '100%'}} = props;

  if (children) {
    return (
      <StyledSkeleton className="testkube-skeleton" active={active} title={title} paragraph={paragraph} {...props}>
        {children}
      </StyledSkeleton>
    );
  }

  return (
    <StyledSkeleton className="testkube-skeleton" active={active} title={title} paragraph={paragraph} {...props} />
  );
};
