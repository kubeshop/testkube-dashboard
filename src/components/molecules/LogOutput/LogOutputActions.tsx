import {useMemo} from 'react';

import stripAnsi from 'strip-ansi';

import {CopyButton, DownloadButton} from '@atoms';

import useLocation from '@hooks/useLocation';
import useSecureContext from '@hooks/useSecureContext';

import {LogAction} from '@models/log';

import FullScreenAction from './FullscreenLogOutput/FullScreenAction';
import {StyledLogOutputActionsContainer} from './LogOutput.styled';

type LogOutputActionsProps = {
  logOutput: string;
  actions: LogAction[];
};

const LogOutputActions: React.FC<LogOutputActionsProps> = props => {
  const {logOutput, actions} = props;
  const isSecureContext = useSecureContext();
  const filename = useLocation().lastPathSegment;

  const logOutputActionsMap: Record<LogAction, JSX.Element> = {
    copy: isSecureContext ? (
      <CopyButton content={stripAnsi(logOutput)} key="copy-action" />
    ) : (
      <DownloadButton filename={filename} extension="log" content={stripAnsi(logOutput)} key="download-action" />
    ),
    fullscreen: <FullScreenAction key="fullscreen-log-action" />,
  };

  const renderedLogOutputActions = useMemo(() => {
    return actions.map(actionType => {
      return logOutputActionsMap[actionType];
    });
  }, [actions]);

  return <StyledLogOutputActionsContainer>{renderedLogOutputActions}</StyledLogOutputActionsContainer>;
};

export default LogOutputActions;
