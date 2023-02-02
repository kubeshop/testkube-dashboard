import {useMemo} from 'react';

import stripAnsi from 'strip-ansi';

import {LogAction} from '@models/log';

import {CopyButton} from '@atoms';
import DownloadButton from '@atoms/DownloadButton/DownloadButton';

import useQueryParams from '@hooks/useQueryParams';
import useSecureContext from '@hooks/useSecureContext';

import {StyledLogOutputActionsContainer} from './LogOutput.styled';
import FullScreenAction from './logActions/FullScreenAction';

type LogOutputActionsProps = {
  logOutput: string;
  actions: LogAction[];
};

const LogOutputActions: React.FC<LogOutputActionsProps> = props => {
  const {logOutput, actions} = props;
  const isSecureContext = useSecureContext();
  const filename = useQueryParams().lastPathSegment;

  const logOutputActionsMap: {[key in LogAction]: any} = {
    copy: isSecureContext ? (
      <CopyButton content={stripAnsi(logOutput)} key="copy-action" />
    ) : (
      <DownloadButton filename={filename} extension="log" content={stripAnsi(logOutput)} />
    ),
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
