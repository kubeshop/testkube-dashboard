import {memo, useCallback, useContext, useEffect, useRef, useState} from 'react';
import useWebSocket from 'react-use-websocket';

import Ansi from 'ansi-to-react';

import {LogAction} from '@models/log';

import {MainContext} from '@contexts';

import {StyledLogOutputContainer, StyledLogTextContainer, StyledPreLogText} from './LogOutput.styled';
import LogOutputHeader from './LogOutputHeader';

export type LogActionProps = {
  logOutput: string;
};

export type LogOutputProps = {
  logOutput?: string;
  executionId?: string;
  actions?: LogAction[];
  isFullScreen?: boolean;
  isRunning?: boolean;
  title?: string;
  isAutoScrolled?: boolean;
};

const LogOutput: React.FC<LogOutputProps> = props => {
  const {logOutput = 'No logs', executionId, actions = ['copy'], isRunning, title, isAutoScrolled} = props;

  const ref = useRef<HTMLDivElement>(null);

  const {wsRoot} = useContext(MainContext);

  // const {isFullScreenLogOutput} = useAppSelector(selectFullScreenLogOutput);

  const [logs, setLogs] = useState('');
  const [shouldConnect, setShouldConnect] = useState(false);

  const scrollToBottom: (behavior?: ScrollBehavior) => void = (behavior = 'smooth') => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({behavior, block: 'end'});
    }
  };

  const smoothScrollIfAutoscroll = useCallback(() => {
    if (!isAutoScrolled) {
      return;
    }

    scrollToBottom();
  }, [isAutoScrolled]);

  useWebSocket(
    `${wsRoot}/executions/${executionId}/logs/stream`,
    {
      onMessage: e => {
        const logData = e.data;

        setLogs(prev => {
          if (prev) {
            const dataToJSON = JSON.parse(logData);

            if (dataToJSON?.result?.output) {
              return dataToJSON.result.output;
            }

            const finalString = `${prev}\n${dataToJSON.content}`;

            return finalString;
          }

          return `${logData}\n`;
        });
      },
    },
    shouldConnect
  );

  useEffect(() => {
    if (!isRunning) {
      setLogs(logOutput);
    } else {
      setLogs('');
    }

    return () => {
      setLogs('');
    };
  }, [isRunning, executionId]);

  useEffect(() => {
    setShouldConnect(isRunning || false);
  }, [isRunning]);

  // useEffect(() => {
  //   if (isFullScreenLogOutput) {
  //     dispatch(setLogOutput(logs));
  //   } else {
  //     dispatch(setLogOutput(''));
  //   }
  // }, [logs, isFullScreenLogOutput]);

  useEffect(() => {
    smoothScrollIfAutoscroll();
  }, [logs]);

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom('auto');
    }, 100);
  }, [executionId]);

  return (
    <StyledLogOutputContainer>
      <LogOutputHeader logOutput={logs} actions={actions} title={title} />
      <StyledLogTextContainer>
        {logs ? (
          <StyledPreLogText>
            <Ansi useClasses>{logs}</Ansi>
          </StyledPreLogText>
        ) : null}
        <div ref={ref} />
      </StyledLogTextContainer>
    </StyledLogOutputContainer>
  );
};

export default memo(LogOutput);
