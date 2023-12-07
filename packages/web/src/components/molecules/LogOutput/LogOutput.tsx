import React, {Fragment, createElement, memo, useRef} from 'react';
import {createPortal} from 'react-dom';

import {useClientRect} from '@hooks/useClientRect';

import {useTestsSlot} from '@plugins/tests-and-test-suites/hooks';

import {useLogOutputPick} from '@store/logOutput';

import {AnimatedFullscreenLogOutput} from './AnimatedFullscreenLogOutput';
import {LogOutputWrapper} from './LogOutput.styled';
import LogOutputPure, {LogOutputPureRef} from './LogOutputPure';
import {LogOutputProps, useLogOutput} from './useLogOutput';

const LogOutput: React.FC<LogOutputProps> = props => {
  const logRef = useRef<LogOutputPureRef>(null);
  const rect = useClientRect(logRef.current?.container);
  const options = useLogOutput(props);
  const {isFullscreen} = useLogOutputPick('isFullscreen');
  const fullscreenContainer = document.querySelector('#log-output-container')!;

  return (
    <>
      <LogOutputWrapper>
        {/* eslint-disable-next-line react/no-array-index-key */}
        {useTestsSlot('logOutputTop').map((element, i) => createElement(Fragment, {key: i}, element))}
        <LogOutputPure ref={logRef} {...options} />
      </LogOutputWrapper>
      {createPortal(<AnimatedFullscreenLogOutput $rect={rect} in={isFullscreen} {...options} />, fullscreenContainer)}
    </>
  );
};

export default memo(LogOutput);
