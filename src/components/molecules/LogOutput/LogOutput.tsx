import React, {useEffect, useState} from 'react';

import {LogAction} from '@models/log';

import {useAppDispatch} from '@redux/hooks';
import {setLogOutput} from '@redux/reducers/configSlice';

import {StyledLogOutputContainer, StyledLogTextContainer, StyledPreLogText} from './LogOutput.styled';
import LogOutputHeader from './LogOutputHeader';

export type LogActionProps = {
  logOutput: string;
};

type LogOutputProps = {
  logOutput?: string;
  executionId?: string;
  actions?: Array<LogAction>;
  isFullScreen?: boolean;
};

const LogOutput: React.FC<LogOutputProps> = props => {
  const {logOutput = '', executionId, actions = ['copy', 'fullscreen'], isFullScreen = false} = props;

  const dispatch = useAppDispatch();

  const [logs, setLogs] = useState(logOutput);

  useEffect(() => {
    if (!logOutput && executionId) {
      const sse = new EventSource(`${localStorage.getItem('apiEndpoint')}/executions/${executionId}/logs`);

      sse.onmessage = e => {
        if (isFullScreen) {
          dispatch(setLogOutput(e.data));
        }

        setLogs(e.data);
      };

      return () => {
        sse.close();
      };
    }

    setLogs(logOutput);
  }, [logOutput]);

  return (
    <StyledLogOutputContainer $isFullScreen={isFullScreen}>
      <LogOutputHeader logOutput={logs} actions={actions} />
      <StyledLogTextContainer>{logs ? <StyledPreLogText>{logs}</StyledPreLogText> : null}</StyledLogTextContainer>
    </StyledLogOutputContainer>
  );
};

export default LogOutput;
