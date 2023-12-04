import React, {Fragment, createElement, memo, useCallback, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {CSSTransition} from 'react-transition-group';
import {useInterval} from 'react-use';

import {isEqual} from 'lodash';

import {Coordinates} from '@models/config';

import {useTestsSlot} from '@plugins/tests-and-test-suites/hooks';

import {useLogOutputPick} from '@store/logOutput';

import FullscreenLogOutput from './FullscreenLogOutput';
import {LogOutputWrapper} from './LogOutput.styled';
import LogOutputPure from './LogOutputPure';
import {useLogsStream} from './useLogsStream';
import {useCountLines, useLastLines} from './utils';

export type LogOutputProps = {
  logOutput?: string;
  executionId?: string;
  isRunning?: boolean;
  initialLines?: number;
};

const LogOutput: React.FC<LogOutputProps> = props => {
  const {logOutput = 'No logs', executionId, isRunning = false, initialLines = 300} = props;

  const containerRef = useRef<HTMLDivElement>(null);

  const {isFullscreen} = useLogOutputPick('isFullscreen');

  const [rect, setRect] = useState<Coordinates | undefined>();
  const streamLogs = useLogsStream(executionId, isRunning);
  const logs = isRunning && executionId ? streamLogs : logOutput;

  const [expanded, setExpanded] = useState(false);
  const lines = useCountLines(logs);
  const visibleLogs = useLastLines(logs, expanded || isRunning ? Infinity : initialLines);

  const onExpand = useCallback(() => setExpanded(true), []);

  useInterval(() => {
    const clientRect = containerRef?.current?.getBoundingClientRect();
    if (clientRect && !isEqual(clientRect, rect)) {
      setRect({
        top: clientRect.top,
        left: clientRect.left,
        width: clientRect.width,
        height: clientRect.height,
      });
    }
  }, 200);

  const fullscreenLogRef = useRef<HTMLDivElement>(null);
  const fullscreenLog = (
    <CSSTransition
      nodeRef={fullscreenLogRef}
      in={isFullscreen}
      timeout={500}
      classNames="full-screen-log-output"
      unmountOnExit
    >
      <FullscreenLogOutput
        ref={fullscreenLogRef}
        $rect={rect}
        logs={logs}
        visibleLogs={visibleLogs}
        expanded={expanded}
        lines={lines}
        initialLines={initialLines}
        onExpand={onExpand}
      />
    </CSSTransition>
  );

  return (
    <>
      <LogOutputWrapper>
        {/* eslint-disable-next-line react/no-array-index-key */}
        {useTestsSlot('logOutputTop').map((element, i) => createElement(Fragment, {key: i}, element))}
        <LogOutputPure
          ref={containerRef}
          logs={logs}
          visibleLogs={visibleLogs}
          expanded={expanded}
          lines={lines}
          initialLines={initialLines}
          onExpand={onExpand}
        />
      </LogOutputWrapper>
      {createPortal(fullscreenLog, document.querySelector('#log-output-container')!)}
    </>
  );
};

export default memo(LogOutput);
