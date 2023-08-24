import {FC, memo, useEffect, useMemo, useRef} from 'react';

import {useInViewport} from '@hooks/useInViewport';

import {StyledScrollTrigger} from './ScrollTrigger.styled';

type ScrollTriggerProps = {
  offset?: number;
  disabled?: boolean;
  onScroll?: () => void;
};

const InternalScrollTrigger: FC<ScrollTriggerProps> = memo(props => {
  const {offset = 0, disabled = false, onScroll} = props;
  const style = useMemo(() => ({top: `${-offset}px`}), [offset]);
  const ref = useRef(null);
  const isInViewport = useInViewport(ref);

  useEffect(() => {
    if (isInViewport && !disabled) {
      onScroll?.();
    }
  }, [isInViewport, disabled]);

  return <StyledScrollTrigger ref={ref} style={style} />;
});

export const ScrollTrigger: FC<ScrollTriggerProps> = ({onScroll, disabled, ...rest}) =>
  onScroll && !disabled ? <InternalScrollTrigger onScroll={onScroll} {...rest} /> : null;
