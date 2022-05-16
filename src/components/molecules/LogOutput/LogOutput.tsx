import React, {useEffect, useState} from 'react';

import {LogAction} from '@models/log';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {selectFullScreenLogOutput, setLogOutput} from '@redux/reducers/configSlice';

import {StyledLogOutputContainer, StyledLogTextContainer, StyledPreLogText} from './LogOutput.styled';
import LogOutputHeader from './LogOutputHeader';

export type LogActionProps = {
  logOutput: string;
};

export type LogOutputProps = {
  logOutput?: string;
  executionId?: string;
  actions?: Array<LogAction>;
  isFullScreen?: boolean;
  isRunning?: boolean;
};

const LogOutput: React.FC<LogOutputProps> = props => {
  const {logOutput = '', executionId, actions = ['copy', 'fullscreen'], isRunning} = props;

  const dispatch = useAppDispatch();
  const {isFullScreenLogOutput} = useAppSelector(selectFullScreenLogOutput);

  const [logs, setLogs] = useState('');

  useEffect(() => {
    if (isRunning) {
      const eventSource = new EventSource(`${localStorage.getItem('apiEndpoint')}/executions/${executionId}/logs`);

      eventSource.addEventListener('message', e => {
        setLogs(prev => {
          if (prev) {
            const dataToJSON = JSON.parse(e.data);
            const finalString = `${prev}\n${dataToJSON.content}`;

            return finalString;
          }

          return e.data;
        });
      });

      return () => {
        eventSource.close();
      };
    }

    setLogs(logOutput);

    return () => {
      setLogs('');
    };
  }, [isRunning, logOutput]);

  useEffect(() => {
    if (isFullScreenLogOutput) {
      dispatch(setLogOutput(logs));
    } else {
      dispatch(setLogOutput(''));
    }
  }, [logs, isFullScreenLogOutput]);

  return (
    <StyledLogOutputContainer>
      <LogOutputHeader logOutput={logs} actions={actions} />
      <StyledLogTextContainer>{logs ? <StyledPreLogText>{logs}</StyledPreLogText> : null}</StyledLogTextContainer>
    </StyledLogOutputContainer>
  );
};

export default LogOutput;
