import React, {ReactNode, memo, useCallback, useEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {CSSTransition} from 'react-transition-group';
import {useAsync, useInterval} from 'react-use';
import useWebSocket from 'react-use-websocket';

import {isEqual} from 'lodash';

import {Coordinates} from '@models/config';

import {useWsEndpoint} from '@services/apiEndpoint';

import {useLogOutputPick} from '@store/logOutput';

import {getRtkIdToken} from '@utils/rtk';

import FullScreenLogOutput from './FullscreenLogOutput';
import {DrawerBannerContainer, LogOutputWrapper} from './LogOutput.styled';
import LogOutputPure from './LogOutputPure';
import {useCountLines, useLastLines} from './utils';

export type LogOutputProps = {
  banner?: ReactNode;
  logOutput?: string;
  executionId?: string;
  isRunning?: boolean;
  initialLines?: number;
};

const LogOutput: React.FC<LogOutputProps> = props => {
  const {logOutput = 'No logs', executionId, isRunning = false, initialLines = 300, banner} = props;

  const containerRef = useRef<HTMLDivElement>(null);

  const wsRoot = useWsEndpoint();

  const {isFullscreen} = useLogOutputPick('isFullscreen');

  const [rect, setRect] = useState<Coordinates | undefined>();
  const [logs, setLogs] = useState('');
  const [shouldConnect, setShouldConnect] = useState(false);

  const [expanded, setExpanded] = useState(false);
  const lines = useCountLines(logs);
  const visibleLogs = useLastLines(logs, expanded || isRunning ? Infinity : initialLines);

  const onExpand = useCallback(() => setExpanded(true), []);

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
    setLogs(isRunning ? '' : logOutput);
    setShouldConnect(isRunning);
  }, [isRunning, executionId]);

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
      <FullScreenLogOutput
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
        {banner ? <DrawerBannerContainer>{banner}</DrawerBannerContainer> : null}
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
      {createPortal(fullscreenLog, document.body)}
    </>
  );
};

export default memo(LogOutput);
