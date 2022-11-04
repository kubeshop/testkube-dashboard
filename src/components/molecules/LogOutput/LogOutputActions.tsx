import {useMemo} from 'react';

import stripAnsi from 'strip-ansi';

import {LogAction} from '@models/log';

import {CopyButton} from '@atoms';

import {StyledLogOutputActionsContainer} from './LogOutput.styled';
import FullScreenAction from './logActions/FullScreenAction';

type LogOutputActionsProps = {
  logOutput: string;
  actions: LogAction[];
};

const LogOutputActions: React.FC<LogOutputActionsProps> = props => {
  const {logOutput, actions} = props;

  const logOutputActionsMap: {[key in LogAction]: any} = {
    copy: <CopyButton content={stripAnsi(logOutput)} key="copy-action" />,
    fullscreen: <FullScreenAction logOutput={logOutput} key="fullscreen-log-action" />,
  };

  const renderedLogOutputActions = useMemo(() => {
    return actions.map(actionType => {
      return logOutputActionsMap[actionType];
    });
  }, [actions]);

  return <StyledLogOutputActionsContainer>{renderedLogOutputActions}</StyledLogOutputActionsContainer>;
};

export default LogOutputActions;
