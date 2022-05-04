import {useMemo} from 'react';

import {LogAction} from '@models/log';

import {StyledLogOutputActionsContainer} from './LogOutput.styled';
import CopyAction from './logActions/CopyAction';
import FullScreenAction from './logActions/FullScreenAction';

type LogOutputActionsProps = {
  logOutput: string;
  actions: Array<LogAction>;
};

const LogOutputActions: React.FC<LogOutputActionsProps> = props => {
  const {logOutput, actions} = props;

  const logOutputActionsMap: {[key in LogAction]: any} = {
    copy: <CopyAction logOutput={logOutput} key="copy-log-action" />,
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
