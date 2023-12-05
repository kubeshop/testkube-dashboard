import React, {FC, forwardRef, memo, useEffect, useRef} from 'react';

import {useScrolledToBottom} from '@hooks/useScrolledToBottom';

import {Console} from './Console';
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

const LogOutputPure = memo(
  forwardRef<HTMLDivElement, LogOutputPureProps>(
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
      const scrollableRef = useRef<HTMLPreElement | null>(null);
      const isScrolledToBottom = useScrolledToBottom(scrollableRef?.current);

      useEffect(() => {
        if (scrollableRef?.current && isScrolledToBottom) {
          scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight;
        }
      }, [visibleLogs]);

      const start = expanded || lines < initialLines ? 1 : lines - initialLines + 1;

      return (
        <StyledLogOutputContainer className={className} ref={ref}>
          {hideActions ? null : <LogOutputHeader logOutput={logs} />}
          {visibleLogs ? (
            <StyledPreLogText data-test="log-output" $wrap={wrap} ref={scrollableRef}>
              {start === 1 ? null : (
                <ExpandComponent totalLines={lines} visibleLines={initialLines} onClick={onExpand} />
              )}
              <Console start={start} content={visibleLogs} LineComponent={LineComponent} />
            </StyledPreLogText>
          ) : null}
        </StyledLogOutputContainer>
      );
    }
  )
);

export default LogOutputPure;
