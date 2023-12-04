import {useEffect, useState} from 'react';
import {useAsync} from 'react-use';
import useWebSocket from 'react-use-websocket';

import {useWsEndpoint} from '@services/apiEndpoint';

import {getRtkIdToken} from '@utils/rtk';

export const useLogsStream = (executionId?: string, enabled?: boolean) => {
  const wsRoot = useWsEndpoint();
  const [logs, setLogs] = useState('');

  // TODO: Consider getting token different way than using the one from RTK
  const {value: token, loading: tokenLoading} = useAsync(getRtkIdToken);
  useWebSocket(
    `${wsRoot}/executions/${executionId}/logs/stream`,
    {
      onMessage: e => {
        const logData = e.data;

        setLogs(prev => {
          if (prev) {
            try {
              const dataToJSON = JSON.parse(logData);
              const potentialOutput = dataToJSON?.result?.output || dataToJSON?.output;

              if (potentialOutput) {
                return potentialOutput;
              }

              return `${prev}\n${dataToJSON.content}`;
            } catch (err) {
              // It may be just an output directly, so we have to ignore it
            }
            return `${prev}\n${logData}`;
          }

          return `${logData}`;
        });
      },
      shouldReconnect: () => true,
      retryOnError: true,
      queryParams: token ? {token} : {},
    },
    Boolean(executionId) && enabled && !tokenLoading
  );

  useEffect(() => {
    setLogs('');
  }, [executionId]);

  return logs;
};
