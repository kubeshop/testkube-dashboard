import React, {MouseEvent, ReactNode, memo, useCallback, useEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {CSSTransition} from 'react-transition-group';
import {useAsync, useInterval} from 'react-use';
import useWebSocket from 'react-use-websocket';

import Ansi from 'ansi-to-react';

import {useScrolledToBottom} from '@hooks/useScrolledToBottom';

import {Coordinates} from '@models/config';

import {useWsEndpoint} from '@services/apiEndpoint';

import {useLogOutputPick} from '@store/logOutput';

import {getRtkIdToken} from '@utils/fetchUtils';

import FullScreenLogOutput from './FullscreenLogOutput';
import {
  DrawerBannerContainer,
  LogOutputWrapper,
  StyledLogOutputContainer,
  StyledLogTextContainer,
  StyledPreLogText,
} from './LogOutput.styled';
import LogOutputHeader from './LogOutputHeader';
import {useCountLines, useLastLines} from './utils';

export type LogOutputProps = {
  banner?: ReactNode;
  logOutput?: string;
  executionId?: string;
  isRunning?: boolean;
  initialLines?: number;
};

const LogOutput: React.FC<LogOutputProps> = props => {
  const {logOutput = 'No logs', executionId, isRunning, initialLines = 300, banner} = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollableRef = useRef<HTMLDivElement>(null);
  const isScrolledToBottom = useScrolledToBottom(scrollableRef.current);

  const wsRoot = useWsEndpoint();

  const {isFullscreen} = useLogOutputPick('isFullscreen');

  const [rect, setRect] = useState<Coordinates | undefined>();
  const [logs, setLogs] = useState('');
  const [shouldConnect, setShouldConnect] = useState(false);

  const [expanded, setExpanded] = useState(false);
  const lines = useCountLines(logs);
  const visibleLogs = useLastLines(logs, expanded || isRunning ? Infinity : initialLines);

  const onExpand = useCallback((event: MouseEvent) => {
    event.preventDefault();
    setExpanded(true);
  }, []);

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
    if (scrollableRef.current && isScrolledToBottom) {
      scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight;
    }
  }, [logs]);

  useInterval(() => {
    const clientRect = scrollableRef?.current?.getBoundingClientRect();
    if (clientRect) {
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
      <FullScreenLogOutput ref={fullscreenLogRef} logOutput={logs} initialLines={initialLines} rect={rect} />
    </CSSTransition>
  );

  return (
    <>
      <LogOutputWrapper>
        {banner ? <DrawerBannerContainer>{banner}</DrawerBannerContainer> : null}
        <StyledLogOutputContainer ref={containerRef}>
          <LogOutputHeader logOutput={logs} />

          <StyledLogTextContainer ref={scrollableRef}>
            {visibleLogs ? (
              <StyledPreLogText data-test="log-output">
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
          </StyledLogTextContainer>
        </StyledLogOutputContainer>
      </LogOutputWrapper>
      {createPortal(fullscreenLog, document.body)}
    </>
  );
};

export default memo(LogOutput);
