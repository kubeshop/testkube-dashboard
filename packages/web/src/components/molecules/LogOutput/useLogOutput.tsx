import {useCallback, useState} from 'react';

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

export const useLogOutput = (props: LogOutputProps): LogOutputPureProps => {
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

  const streamLogs = useLogsStream(executionId, isRunning);
  const logs = isRunning && executionId ? streamLogs : logOutput;

  const [expanded, setExpanded] = useState(false);
  const lines = useCountLines(logs);
  const visibleLogs = useLastLines(logs, expanded || isRunning ? Infinity : initialLines);

  const onExpand = useCallback(() => setExpanded(true), []);

  return {
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
};
