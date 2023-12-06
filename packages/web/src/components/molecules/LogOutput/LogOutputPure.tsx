import React, {FC, RefObject, forwardRef, memo, useEffect, useImperativeHandle, useRef} from 'react';

import {useScrolledToBottom} from '@hooks/useScrolledToBottom';

import {Console, ConsoleRef} from './Console';
import {ConsoleLine} from './ConsoleLine';
import {ExpandButton} from './ExpandButton';
import {StyledLogOutputContainer, StyledPreLogText} from './LogOutput.styled';
import LogOutputHeader from './LogOutputHeader';

export interface LogOutputPureProps {
  className?: string;
  logs: string;
  visibleLogs: string;
  expanded: boolean;
  lines: number;
  initialLines: number;
  hideActions?: boolean;
  wrap?: boolean;
  LineComponent?: Parameters<typeof Console>[0]['LineComponent'];
  ExpandComponent?: FC<{visibleLines: number; totalLines: number; onClick: () => void}>;
  onExpand: () => void;
}

export interface LogOutputPureRef {
  containerRef: RefObject<HTMLDivElement | null>;
  console: ConsoleRef | null;
}

const LogOutputPure = memo(
  forwardRef<LogOutputPureRef, LogOutputPureProps>(
    (
      {
        className,
        hideActions,
        logs,
        visibleLogs,
        expanded,
        wrap,
        lines,
        initialLines,
        LineComponent = ConsoleLine,
        ExpandComponent = ExpandButton,
        onExpand,
      },
      ref
    ) => {
      const consoleRef = useRef<ConsoleRef | null>(null);
      const containerRef = useRef<HTMLDivElement | null>(null);
      const isScrolledToBottom = useScrolledToBottom(consoleRef.current?.container);
      const start = expanded || lines < initialLines ? 1 : lines - initialLines + 1;

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
      }, [visibleLogs]);

      return (
        <StyledLogOutputContainer className={className} ref={containerRef}>
          {hideActions ? null : <LogOutputHeader logOutput={logs} />}
          {visibleLogs ? (
            <StyledPreLogText data-test="log-output">
              <Console
                prepend={
                  start === 1 ? null : (
                    <ExpandComponent totalLines={lines} visibleLines={initialLines} onClick={onExpand} />
                  )
                }
                wrap={wrap}
                start={start}
                content={visibleLogs}
                LineComponent={LineComponent}
                ref={consoleRef}
              />
            </StyledPreLogText>
          ) : null}
        </StyledLogOutputContainer>
      );
    }
  )
);

export default LogOutputPure;
