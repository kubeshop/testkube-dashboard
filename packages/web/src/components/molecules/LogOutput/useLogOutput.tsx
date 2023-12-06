import LogOutputPure, {LogOutputPureProps} from './LogOutputPure';
import {useLogsStream} from './useLogsStream';

export type LogOutputProps = {
  logOutput?: string;
  executionId?: string;
  isRunning?: boolean;
  hideActions?: boolean;
  wrap?: boolean;
  LineComponent?: Parameters<typeof LogOutputPure>[0]['LineComponent'];
};

export const useLogOutput = (props: LogOutputProps): LogOutputPureProps => {
  const {
    logOutput = 'No logs',
    executionId,
    wrap = false,
    hideActions = false,
    isRunning = false,
    LineComponent,
  } = props;

  const streamLogs = useLogsStream(executionId, isRunning);
  const logs = isRunning && executionId ? streamLogs : logOutput;

  return {
    hideActions,
    logs,
    wrap,
    LineComponent,
  };
};
