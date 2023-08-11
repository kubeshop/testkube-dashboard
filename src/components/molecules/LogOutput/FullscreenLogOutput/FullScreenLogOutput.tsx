import React, {MouseEvent, forwardRef, useCallback, useEffect, useRef, useState} from 'react';

import Ansi from 'ansi-to-react';
import {debounce} from 'lodash';

import {useAppSelector} from '@redux/hooks';
import {selectFullScreenLogOutput} from '@redux/reducers/configSlice';

import {LogOutputProps} from '../LogOutput';
import {StyledLogTextContainer, StyledPreLogText} from '../LogOutput.styled';
import LogOutputHeader from '../LogOutputHeader';
import {useCountLines, useLastLines} from '../utils';

import {StyledFullscreenLogOutputContainer} from './FullscreenLogOutput.styled';

const FullScreenLogOutput = forwardRef<HTMLDivElement, Pick<LogOutputProps, 'actions' | 'logOutput' | 'initialLines'>>(
  (props, ref: any) => {
    const {logOutput = '', initialLines = 300} = props;

    const [expanded, setExpanded] = useState(false);
    const lines = useCountLines(logOutput);
    const visibleLogs = useLastLines(logOutput, expanded ? Infinity : initialLines);

    const onExpand = useCallback((event: MouseEvent) => {
      event.preventDefault();
      setExpanded(true);
    }, []);

    const bottomRef = useRef<HTMLDivElement>(null);

    const {logOutputDOMRect} = useAppSelector(selectFullScreenLogOutput);

    const scrollToBottom = debounce(() => {
      if (ref.current) {
        ref.current.scrollTo(0, ref.current.scrollHeight);
      }
    }, 300);

    useEffect(scrollToBottom, [ref.current]);

    return (
      <StyledFullscreenLogOutputContainer
        ref={ref}
        logOutputDOMRect={logOutputDOMRect}
        onTransitionEnd={scrollToBottom}
      >
        <LogOutputHeader logOutput={logOutput} isFullScreen />
        <StyledLogTextContainer>
          {visibleLogs ? (
            <StyledPreLogText>
              {!expanded && lines >= initialLines ? (
                <>
                  <a href="#" onClick={onExpand}>
                    Click to show all {lines} lines...
                  </a>
                  <br />
                </>
              ) : null}
              <Ansi useClasses>{visibleLogs}</Ansi>
            </StyledPreLogText>
          ) : null}
          <div ref={bottomRef} />
        </StyledLogTextContainer>
      </StyledFullscreenLogOutputContainer>
    );
  }
);

export default FullScreenLogOutput;
