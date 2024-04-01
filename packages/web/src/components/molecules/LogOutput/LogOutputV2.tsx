import React, {memo, useMemo, useRef} from 'react';

import {uniq} from 'lodash';

import {LogOutputWrapper} from './LogOutput.styled';
import LogOutputPure, {LogOutputPureRef} from './LogOutputPure';
import * as S from './LogOutputV2.styled';
import {LogOutputProps} from './useLogOutput';
import {useLogsV2} from './useLogsV2';

const UNKNOWN_SOURCE = 'system' as const;

const LogOutputV2: React.FC<LogOutputProps> = props => {
  const {isRunning, wrap, LineComponent, executionId} = props;

  const [openSource, _setOpenSource] = React.useState<string>('');
  const setOpenSource = (source: string) => {
    _setOpenSource(prev => (prev === source ? '' : source));
  };

  const logRef = useRef<LogOutputPureRef>(null);

  const logs = useLogsV2(executionId, isRunning);

  const logSources = useMemo(
    () => [
      UNKNOWN_SOURCE,
      ...uniq(logs.map(log => log.source).filter((source): source is string => Boolean(source && source.length > 0))),
    ],
    [logs]
  );
  const logsBySource = useMemo(() => {
    const dict: Record<string, string> = {};
    logs.forEach(log => {
      let source = log.source && log.source.trim().length ? log.source : UNKNOWN_SOURCE;
      if (!dict[source]) {
        dict[source] = '';
      }
      let previous = dict[source];
      if (previous.length && !previous.endsWith('\n')) {
        previous += '\n';
      }
      dict[source] = previous + log.content;
    });
    // set 'No logs' for sources without logs
    logSources.forEach(source => {
      if (!dict[source]) {
        dict[source] = 'No logs';
      }
    });

    if (dict[UNKNOWN_SOURCE].trim() === '') {
      delete dict[UNKNOWN_SOURCE];
    }

    return dict;
  }, [logs, logSources]);

  return (
    <S.Container>
      {logSources.map(source => (
        <S.SourceSection $open={openSource === source}>
          <S.SourceHeader onClick={() => setOpenSource(source)}>{source}</S.SourceHeader>
          <S.SourceContent>
            <LogOutputWrapper>
              <LogOutputPure
                ref={logRef}
                logs={logsBySource[source]}
                isRunning={isRunning}
                hideActions
                wrap={wrap}
                LineComponent={LineComponent}
              />
            </LogOutputWrapper>
          </S.SourceContent>
        </S.SourceSection>
      ))}
    </S.Container>
  );
};

export default memo(LogOutputV2);
