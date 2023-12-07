import React, {forwardRef, memo, useImperativeHandle, useRef} from 'react';

import {Console, ConsoleRef} from './Console';
import {StyledLogOutputContainer, StyledPreLogText} from './LogOutput.styled';
import LogOutputHeader from './LogOutputHeader';

export interface LogOutputPureProps {
  className?: string;
  logs: string;
  hideActions?: boolean;
  wrap?: boolean;
  LineComponent?: Parameters<typeof Console>[0]['LineComponent'];
}

export interface LogOutputPureRef {
  container: HTMLDivElement | null;
  console: ConsoleRef | null;
}

const LogOutputPure = memo(
  forwardRef<LogOutputPureRef, LogOutputPureProps>(({className, hideActions, logs, wrap, LineComponent}, ref) => {
    const consoleRef = useRef<ConsoleRef | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useImperativeHandle(
      ref,
      () => ({
        get container() {
          return containerRef.current;
        },
        get console() {
          return consoleRef.current;
        },
      }),
      []
    );

    return (
      <StyledLogOutputContainer className={className} ref={containerRef}>
        {hideActions ? null : <LogOutputHeader logOutput={logs} />}
        {logs ? (
          <StyledPreLogText data-test="log-output">
            <Console wrap={wrap} content={logs} LineComponent={LineComponent} ref={consoleRef} />
          </StyledPreLogText>
        ) : null}
      </StyledLogOutputContainer>
    );
  })
);

export default LogOutputPure;
