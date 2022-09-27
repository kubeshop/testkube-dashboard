import {useCallback, useContext, useEffect, useRef, useState} from 'react';

import {Checkbox} from 'antd';

import {LogAction} from '@models/log';

import {useAppSelector} from '@redux/hooks';
import {selectFullScreenLogOutput, setLogOutput} from '@redux/reducers/configSlice';

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

  const {dispatch} = useContext(MainContext);

  const {isFullScreenLogOutput} = useAppSelector(selectFullScreenLogOutput);

  const [logs, setLogs] = useState('');
  const [shouldBeScrolled, setScrolledState] = useState(true);

  const scrollToBottom = useCallback(() => {
    if (!isAutoScrolled) {
      return;
    }

    setScrolledState(prev => {
      if (prev && ref.current) {
        ref.current.scrollIntoView({behavior: 'smooth', block: 'end'});
      }

      return prev;
    });
  }, [isAutoScrolled]);

  useEffect(() => {
    if (isRunning) {
      const eventSource = new EventSource(`${localStorage.getItem('apiEndpoint')}/executions/${executionId}/logs`);

      eventSource.addEventListener('message', e => {
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

  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  return (
    <>
      <Checkbox
        onChange={() => {
          setScrolledState(prev => !prev);
        }}
        style={{position: 'absolute'}}
        checked={isAutoScrolled}
      >
        Autoscroll
      </Checkbox>

      <StyledLogOutputContainer ref={ref}>
        <LogOutputHeader logOutput={logs} actions={actions} title={title} />
        <StyledLogTextContainer>{logs ? <StyledPreLogText>{logs}</StyledPreLogText> : null}</StyledLogTextContainer>
      </StyledLogOutputContainer>
    </>
  );
};

export default LogOutput;
