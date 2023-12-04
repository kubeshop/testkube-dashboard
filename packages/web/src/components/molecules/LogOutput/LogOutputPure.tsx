import React, {MouseEvent, forwardRef, memo, useCallback, useEffect, useRef} from 'react';

import Ansi from 'ansi-to-react';

import {useScrolledToBottom} from '@hooks/useScrolledToBottom';

import {StyledLogOutputContainer, StyledLogTextContainer, StyledPreLogText} from './LogOutput.styled';
import LogOutputHeader from './LogOutputHeader';

export interface LogOutputPureProps {
  className?: string;
  logs: string;
  visibleLogs: string;
  expanded: boolean;
  lines: number;
  initialLines: number;
  hideActions?: boolean;
  onExpand: () => void;
}

const LogOutputPure = memo(
  forwardRef<HTMLDivElement, LogOutputPureProps>(
    ({className, hideActions, logs, visibleLogs, expanded, lines, initialLines, onExpand}, ref) => {
      const scrollableRef = useRef<HTMLDivElement | null>(null);
      const isScrolledToBottom = useScrolledToBottom(scrollableRef?.current);

      const expand = useCallback(
        (event: MouseEvent) => {
          event.preventDefault();
          onExpand?.();
        },
        [onExpand]
      );

      useEffect(() => {
        if (scrollableRef?.current && isScrolledToBottom) {
          scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight;
        }
      }, [visibleLogs]);

      return (
        <StyledLogOutputContainer className={className} ref={ref}>
          {hideActions ? null : <LogOutputHeader logOutput={logs} />}

          <StyledLogTextContainer ref={scrollableRef}>
            {visibleLogs ? (
              <StyledPreLogText data-test="log-output">
                {!expanded && lines >= initialLines ? (
                  <>
                    <a href="#" onClick={expand}>
                      Click to show all {lines} lines...
                    </a>
                    <br />
                  </>
                ) : null}
                <Ansi useClasses>{visibleLogs}</Ansi>
              </StyledPreLogText>
            ) : null}
          </StyledLogTextContainer>
        </StyledLogOutputContainer>
      );
    }
  )
);

export default LogOutputPure;
