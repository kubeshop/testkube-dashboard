import {useEffect, useRef} from 'react';

import Ansi from 'ansi-to-react';

import {useAppSelector} from '@redux/hooks';
import {selectFullScreenLogOutput} from '@redux/reducers/configSlice';

import useDebounce from '@hooks/useDebounce';

import {LogOutputProps} from '../LogOutput';
import {StyledLogTextContainer, StyledPreLogText} from '../LogOutput.styled';
import {StyledFullscreenLogOutputContainer} from './FullscreenLogOutput.styled';

const FullScreenLogOutput: React.FC<Pick<LogOutputProps, 'actions' | 'logOutput'>> = props => {
  const {logOutput} = props;

  const bottomRef = useRef<HTMLDivElement>(null);

  const {logOutputDOMRect} = useAppSelector(selectFullScreenLogOutput);
  let debouncedLogOutputDOMRect;

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

  useDebounce(
    () => {
      debouncedLogOutputDOMRect = logOutputDOMRect;
    },
    10,
    [logOutputDOMRect]
  );

  return (
    <>
      <StyledFullscreenLogOutputContainer logOutputDOMRect={logOutputDOMRect}>
        <StyledLogTextContainer>
          {logOutput ? (
            <StyledPreLogText>
              <Ansi useClasses>{logOutput}</Ansi>
            </StyledPreLogText>
          ) : null}
          <div ref={bottomRef} />
        </StyledLogTextContainer>
      </StyledFullscreenLogOutputContainer>
    </>
  );
};

export default FullScreenLogOutput;
