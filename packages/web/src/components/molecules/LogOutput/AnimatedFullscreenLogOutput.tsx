import React, {FC, useRef} from 'react';
import {CSSTransition} from 'react-transition-group';

import FullscreenLogOutput from './FullscreenLogOutput';

type AnimatedFullscreenLogOutputProps = Parameters<typeof FullscreenLogOutput>[0] & {
  in?: boolean;
};

export const AnimatedFullscreenLogOutput: FC<AnimatedFullscreenLogOutputProps> = ({in: displayed, ...props}) => {
  const fullscreenLogRef = useRef<HTMLDivElement>(null);
  return (
    <CSSTransition
      nodeRef={fullscreenLogRef}
      in={displayed}
      timeout={500}
      classNames="full-screen-log-output"
      unmountOnExit
    >
      <FullscreenLogOutput ref={fullscreenLogRef} {...props} />
    </CSSTransition>
  );
};
