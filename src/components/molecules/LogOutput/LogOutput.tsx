/* eslint-disable unused-imports/no-unused-imports-ts */
import {useCallback, useContext, useEffect, useRef, useState} from 'react';
import useWebSocket from 'react-use-websocket';

import {LogAction} from '@models/log';

import {useAppSelector} from '@redux/hooks';
import {selectFullScreenLogOutput, setLogOutput} from '@redux/reducers/configSlice';

import {notificationCall} from '@molecules';

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

  const {dispatch, wsRoot} = useContext(MainContext);

  // const {isFullScreenLogOutput} = useAppSelector(selectFullScreenLogOutput);

  const [logs, setLogs] = useState('');

  const scrollToBottom = useCallback(() => {
    if (!isAutoScrolled) {
      return;
    }

    if (ref && ref.current) {
      ref.current.scrollIntoView({behavior: 'smooth', block: 'end'});
    }
  }, [isAutoScrolled]);

  const {...rest} = useWebSocket(
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
      // onError: e => {
      //   console.log('error', e);
      // },
      // onOpen: e => {
      //   console.log('open', e);
      // },
      // onClose: e => {
      //   console.log('close', e);
      // },
    },
    isRunning
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

  // useEffect(() => {
  //   if (isFullScreenLogOutput) {
  //     dispatch(setLogOutput(logs));
  //   } else {
  //     dispatch(setLogOutput(''));
  //   }
  // }, [logs, isFullScreenLogOutput]);

  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  return (
    <StyledLogOutputContainer ref={ref}>
      <LogOutputHeader logOutput={logs} actions={actions} title={title} />
      <StyledLogTextContainer>{logs ? <StyledPreLogText>{logs}</StyledPreLogText> : null}</StyledLogTextContainer>
    </StyledLogOutputContainer>
  );
};

export default LogOutput;
