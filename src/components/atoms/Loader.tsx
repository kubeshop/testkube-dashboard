import {FC} from 'react';

import {SpinProps} from 'antd';

import {ReactComponent as LoadingIcon} from '@assets/loading.svg';

import {StyledLoaderContainer} from './Loader.styled';

type DurationType = 'long' | 'default' | 'short';

type LoaderProps = SpinProps & {
  isCentered?: boolean;
  duration?: DurationType | number;
};

const durationTime: Record<DurationType, number> = {
  long: 5000,
  default: 1000,
  short: 500,
};

export const Loader: FC<LoaderProps> = props => {
  const {isCentered = true, duration = 'default', ...rest} = props;

  const animationDuration = typeof duration === 'number' ? duration : durationTime[duration];

  return (
    <StyledLoaderContainer $isCentered={isCentered} $animationDuration={animationDuration} {...rest}>
      <LoadingIcon />
    </StyledLoaderContainer>
  );
};
