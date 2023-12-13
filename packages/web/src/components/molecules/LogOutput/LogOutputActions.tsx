import {useCallback} from 'react';

import stripAnsi from 'strip-ansi';

import {CopyButton, DownloadButton} from '@atoms';

import useLocation from '@hooks/useLocation';
import useSecureContext from '@hooks/useSecureContext';

import FullscreenAction from './FullscreenAction';
import {StyledLogOutputActionsContainer} from './LogOutput.styled';
import SearchAction from './SearchAction';

type LogOutputActionsProps = {
  logOutput: string;
};

const LogOutputActions: React.FC<LogOutputActionsProps> = props => {
  const {logOutput} = props;
  const strippedLogOutput = useCallback(() => stripAnsi(logOutput), [logOutput]);
  const isSecureContext = useSecureContext();
  const filename = useLocation().lastPathSegment;

  return (
    <StyledLogOutputActionsContainer>
      <SearchAction />
      {isSecureContext ? (
        <CopyButton content={strippedLogOutput} />
      ) : (
        <DownloadButton filename={filename} extension="log" content={strippedLogOutput} />
      )}
      <FullscreenAction key="fullscreen-log-action" />
    </StyledLogOutputActionsContainer>
  );
};

export default LogOutputActions;
