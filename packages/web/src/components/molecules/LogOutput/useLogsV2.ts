import {useEffect, useState} from 'react';
import {useAsync} from 'react-use';
import useWebSocket from 'react-use-websocket';

import {useWsEndpoint} from '@services/apiEndpoint';

import {getRtkIdToken} from '@utils/rtk';

export type LogLine = {content: string; source?: string};

export const useLogsV2 = (executionId?: string, isRunning?: boolean) => {
  const wsRoot = useWsEndpoint();
  const [logs, setLogs] = useState<LogLine[]>([]);

  // TODO: Consider getting token different way than using the one from RTK
  const {value: token, loading: tokenLoading} = useAsync(getRtkIdToken);
  useWebSocket(
    `${wsRoot}/executions/${executionId}/logs/stream/v2`,
    {
      onMessage: e => {
        const logData = JSON.parse(e.data);
        let content = logData.content || '';
        try {
          const formattedTime = new Intl.DateTimeFormat('default', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false, // Use 24-hour format
          }).format(new Date(logData.time));
          content = `[${formattedTime}] ${content}`;
        } catch {
          // Ignore
        }
        logData.content = content;
        setLogs(prev => [...prev, logData]);
      },
      shouldReconnect: () => Boolean(isRunning),
      retryOnError: true,
      queryParams: token ? {token} : {},
    },
    !tokenLoading
  );

  useEffect(() => {
    setLogs([]);
  }, [executionId]);

  return logs;
};
