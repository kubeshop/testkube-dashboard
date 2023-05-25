import {MouseEvent, memo, useCallback, useEffect, useRef, useState} from 'react';
import {useAsync} from 'react-use';
import useWebSocket from 'react-use-websocket';

import Ansi from 'ansi-to-react';

import {LogAction} from '@models/log';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {selectFullScreenLogOutput, setLogOutput, setLogOutputDOMRect} from '@redux/reducers/configSlice';

import {useWsEndpoint} from '@services/apiEndpoint';

import {getRtkIdToken} from '@utils/fetchUtils';

import {StyledLogOutputContainer, StyledLogTextContainer, StyledPreLogText} from './LogOutput.styled';
import LogOutputHeader from './LogOutputHeader';
import {useCountLines, useLastLines} from './utils';

export type LogOutputProps = {
  logOutput?: string;
  executionId?: string;
  actions?: LogAction[];
  isRunning?: boolean;
  title?: string;
  isAutoScrolled?: boolean;
  initialLines?: number;
};

const LogOutput: React.FC<LogOutputProps> = props => {
  const dispatch = useAppDispatch();

  const {
    logOutput = 'No logs',
    executionId,
    actions = ['copy', 'fullscreen'],
    isRunning,
    title,
    isAutoScrolled,
    initialLines = 300,
  } = props;

  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const wsRoot = useWsEndpoint();

  const {isFullScreenLogOutput} = useAppSelector(selectFullScreenLogOutput);

  const [logs, setLogs] = useState('');
  const [shouldConnect, setShouldConnect] = useState(false);

  const [expanded, setExpanded] = useState(false);
  const lines = useCountLines(logs);
  const visibleLogs = useLastLines(logs, expanded ? Infinity : initialLines);

  const scrollToBottom: (behavior?: ScrollBehavior) => void = (behavior = 'smooth') => {
    if (bottomRef && bottomRef.current) {
      bottomRef.current.scrollIntoView({behavior, block: 'end'});
    }
  };

  const onExpand = useCallback((event: MouseEvent) => {
    event.preventDefault();
    setExpanded(true);
  }, []);

  const smoothScrollIfAutoscroll = useCallback(() => {
    if (!isAutoScrolled) {
      return;
    }

    scrollToBottom();
  }, [isAutoScrolled]);

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
    shouldConnect && !tokenLoading
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

  useEffect(() => {
    if (isFullScreenLogOutput) {
      dispatch(setLogOutput(logs));
    } else {
      dispatch(setLogOutput(''));
    }
  }, [logs, isFullScreenLogOutput]);

  useEffect(() => {
    smoothScrollIfAutoscroll();
  }, [logs]);

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom('auto');
    }, 100);
  }, [executionId]);

  useEffect(() => {
    const rect = containerRef?.current?.getBoundingClientRect();
    if (rect) {
      dispatch(
        setLogOutputDOMRect({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        })
      );
    }
  }, [isFullScreenLogOutput]);

  return (
    <StyledLogOutputContainer ref={containerRef}>
      <LogOutputHeader logOutput={logs} actions={actions} title={title} />
      <StyledLogTextContainer>
        {visibleLogs ? (
          <StyledPreLogText>
            {!expanded && lines >= initialLines ? (
              <>
                <a href="#" onClick={onExpand}>
                  Click to show all {lines} lines...
                </a>
                <br />
              </>
            ) : null}
            <Ansi useClasses>{visibleLogs}</Ansi>
          </StyledPreLogText>
        ) : null}
        <div ref={bottomRef} />
      </StyledLogTextContainer>
    </StyledLogOutputContainer>
  );
};

export default memo(LogOutput);
