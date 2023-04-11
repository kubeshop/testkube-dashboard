import {forwardRef, MouseEvent, useCallback, useEffect, useRef, useState} from 'react';

import Ansi from 'ansi-to-react';

import {useAppSelector} from '@redux/hooks';
import {selectFullScreenLogOutput} from '@redux/reducers/configSlice';

import {useCountLines, useLastLines} from '../utils';
import {LogOutputProps} from '../LogOutput';
import {StyledLogTextContainer, StyledPreLogText} from '../LogOutput.styled';
import {StyledFullscreenLogOutputContainer} from './FullscreenLogOutput.styled';

const FullScreenLogOutput = forwardRef<HTMLDivElement, Pick<LogOutputProps, 'actions' | 'logOutput' | 'initialLines'>>((props, ref) => {
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

  const scrollToBottom: (behavior?: ScrollBehavior) => void = () => {
    if (bottomRef && bottomRef.current) {
      bottomRef.current.scrollIntoView({behavior: 'auto', block: 'end'});
    }
  };

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 100);
  }, []);

  return (
    <StyledFullscreenLogOutputContainer ref={ref} logOutputDOMRect={logOutputDOMRect}>
      <StyledLogTextContainer>
        {visibleLogs ? (
          <StyledPreLogText>
            {!expanded && lines >= initialLines ? <>
              <a href='#' onClick={onExpand}>Click to show all {lines} lines...</a>
              <br />
            </> : null}
            <Ansi useClasses>{visibleLogs}</Ansi>
          </StyledPreLogText>
        ) : null}
        <div ref={bottomRef} />
      </StyledLogTextContainer>
    </StyledFullscreenLogOutputContainer>
  );
});

export default FullScreenLogOutput;
