import React, {Fragment, createElement, memo, useCallback, useRef, useState} from 'react';
import {createPortal} from 'react-dom';

import {useClientRect} from '@hooks/useClientRect';

import {useTestsSlot} from '@plugins/tests-and-test-suites/hooks';

import {useLogOutputPick} from '@store/logOutput';

import {AnimatedFullscreenLogOutput} from './AnimatedFullscreenLogOutput';
import {LogOutputWrapper} from './LogOutput.styled';
import LogOutputPure, {LogOutputPureProps} from './LogOutputPure';
import {useLogsStream} from './useLogsStream';
import {useCountLines, useLastLines} from './utils';

export type LogOutputProps = {
  logOutput?: string;
  executionId?: string;
  isRunning?: boolean;
  initialLines?: number;
  hideActions?: boolean;
  wrap?: boolean;
  LineComponent?: Parameters<typeof LogOutputPure>[0]['LineComponent'];
  ExpandComponent?: Parameters<typeof LogOutputPure>[0]['ExpandComponent'];
};

// TODO: Add lazy loading of lines (when wrap: false)
const LogOutput: React.FC<LogOutputProps> = props => {
  const {
    logOutput = 'No logs',
    executionId,
    wrap = false,
    hideActions = false,
    isRunning = false,
    initialLines = 300,
    LineComponent,
    ExpandComponent,
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);

  const {isFullscreen} = useLogOutputPick('isFullscreen');

  const streamLogs = useLogsStream(executionId, isRunning);
  const logs = isRunning && executionId ? streamLogs : logOutput;

  const [expanded, setExpanded] = useState(false);
  const lines = useCountLines(logs);
  const visibleLogs = useLastLines(logs, expanded || isRunning ? Infinity : initialLines);

  const onExpand = useCallback(() => setExpanded(true), []);
  const rect = useClientRect(containerRef);

  const options: LogOutputPureProps = {
    hideActions,
    logs,
    visibleLogs,
    expanded,
    lines,
    initialLines,
    wrap,
    LineComponent,
    ExpandComponent,
    onExpand,
  };

  const fullscreenContainer = document.querySelector('#log-output-container')!;

  return (
    <>
      <LogOutputWrapper>
        {/* eslint-disable-next-line react/no-array-index-key */}
        {useTestsSlot('logOutputTop').map((element, i) => createElement(Fragment, {key: i}, element))}
        <LogOutputPure ref={containerRef} {...options} />
      </LogOutputWrapper>
      {createPortal(<AnimatedFullscreenLogOutput $rect={rect} in={isFullscreen} {...options} />, fullscreenContainer)}
    </>
  );
};

export default memo(LogOutput);
