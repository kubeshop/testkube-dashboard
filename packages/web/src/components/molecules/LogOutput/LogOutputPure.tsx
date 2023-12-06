import React, {RefObject, forwardRef, memo, useEffect, useImperativeHandle, useRef} from 'react';

import {useScrolledToBottom} from '@hooks/useScrolledToBottom';

import {Console, ConsoleRef} from './Console';
import {ConsoleLine} from './ConsoleLine';
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
  containerRef: RefObject<HTMLDivElement | null>;
  console: ConsoleRef | null;
}

const LogOutputPure = memo(
  forwardRef<LogOutputPureRef, LogOutputPureProps>(
    ({className, hideActions, logs, wrap, LineComponent = ConsoleLine}, ref) => {
      const consoleRef = useRef<ConsoleRef | null>(null);
      const containerRef = useRef<HTMLDivElement | null>(null);
      const isScrolledToBottom = useScrolledToBottom(consoleRef.current?.container);

      useImperativeHandle(
        ref,
        () => ({
          containerRef,
          get console() {
            return consoleRef.current;
          },
        }),
        [consoleRef.current]
      );

      useEffect(() => {
        if (isScrolledToBottom) {
          consoleRef.current?.scrollToEnd();
        }
      }, [logs]);

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
    }
  )
);

export default LogOutputPure;
