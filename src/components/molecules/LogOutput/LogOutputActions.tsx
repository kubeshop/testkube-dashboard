import {FC, useCallback} from 'react';

import stripAnsi from 'strip-ansi';

import {CopyButton} from '@atoms/CopyButton';
import {DownloadButton} from '@atoms/DownloadButton';

import {useLocation} from '@hooks/useLocation';
import {useSecureContext} from '@hooks/useSecureContext';

import {StyledLogOutputActionsContainer} from '@molecules/LogOutput.styled';

import {FullscreenAction} from './FullscreenAction';

type LogOutputActionsProps = {
  logOutput: string;
};

export const LogOutputActions: FC<LogOutputActionsProps> = props => {
  const {logOutput} = props;
  const strippedLogOutput = useCallback(() => stripAnsi(logOutput), [logOutput]);
  const isSecureContext = useSecureContext();
  const filename = useLocation().lastPathSegment;

  return (
    <StyledLogOutputActionsContainer>
      {isSecureContext ? (
        <CopyButton content={strippedLogOutput} />
      ) : (
        <DownloadButton filename={filename} extension="log" content={strippedLogOutput} />
      )}
      <FullscreenAction key="fullscreen-log-action" />
    </StyledLogOutputActionsContainer>
  );
};
