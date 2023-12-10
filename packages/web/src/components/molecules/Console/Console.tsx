import {
  FC,
  PropsWithChildren,
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';
import {useEvent, useInterval, useMount, useRafState, useUpdate} from 'react-use';

import {escapeCarriageReturn} from 'escape-carriage';
import styled from 'styled-components';

import AnsiClassesMapping from '@atoms/TestkubeTheme/AnsiClassesMapping';

import {useLastCallback} from '@hooks/useLastCallback';

import {LogProcessor} from '@molecules/Console/LogProcessor';
import {LogProcessorLine} from '@molecules/Console/LogProcessorLine';
import {useLogLinesPosition} from '@molecules/Console/useLogLinesPosition';

import {invisibleScroll} from '@styles/globalStyles';

import {ConsoleLine} from './ConsoleLine';

export interface ConsoleProps {
  wrap?: boolean;
  content: string;
  start?: number;
  LineComponent?: FC<PropsWithChildren<{number: number; maxDigits: number}>>;
}

export interface ConsoleRef {
  container: HTMLDivElement | null;
  getVisualLinesCount: () => number;
  getLineRect: (line: number) => {top: number; height: number};
  scrollToStart: () => void;
  scrollToEnd: () => void;
  scrollToLine: (line: number) => void;
  isScrolledToStart: () => boolean;
  isScrolledToEnd: () => boolean;
}

export const ConsoleContainer = styled.code<{$wrap?: boolean}>`
  display: block;
  width: 100%;
  height: 100%;
  overflow: auto;

  ${({$wrap}) =>
    $wrap
      ? `
        word-break: break-all;
        white-space: break-spaces;`
      : ''}

  ${AnsiClassesMapping}
  ${invisibleScroll}
`;

const ConsoleContent = styled.div`
  width: min-content;
  min-width: 100%;
`;

const ConsoleSpace = styled.div`
  width: 100%;
`;

const PlaceholderContainer = styled.div`
  display: none;
`;

const ConsoleLines: FC<{
  lines: LogProcessorLine[];
  start: number;
  maxDigits: number;
  LineComponent: ConsoleProps['LineComponent'];
}> = memo(({lines, start, maxDigits, LineComponent = ConsoleLine}) => (
  <>
    {lines.map((line, lineIndex) => (
      // eslint-disable-next-line react/no-array-index-key
      <LineComponent key={start + lineIndex} number={start + lineIndex + 1} maxDigits={maxDigits}>
        {line.nodes}
      </LineComponent>
    ))}
  </>
));

// TODO: Optimize to process only newly added content
export const Console = forwardRef<ConsoleRef, ConsoleProps>(({content, wrap, LineComponent = ConsoleLine}, ref) => {
  const processor = useMemo(() => LogProcessor.from(escapeCarriageReturn(content)), [content]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const maxDigits = processor.maxDigits;

  const rerender = useUpdate();

  // Configure
  const prerender = 30; // TODO: Dynamic based on viewport?

  // Keep information about line display
  const lineHeightRef = useRef(1000);
  const lineHeight = lineHeightRef.current;

  // Keep information about lines
  const lineMaxCharactersRef = useRef(Infinity);
  const lineMaxCharacters = lineMaxCharactersRef.current;

  const {getTop, getSize, getVisualLine, total} = useLogLinesPosition(processor, lineMaxCharacters);

  // Get information about current viewport
  const clientHeight = containerRef.current?.clientHeight || 0;
  const clientWidth = containerRef.current?.clientWidth || 0;
  const domScrollTop = containerRef.current?.scrollTop || 0;

  // Keep information about line width
  const characterWidthRef = useRef(0);
  const baseWidthRef = useRef(0);
  const maxCharactersCount = useMemo(
    () => (wrap ? lineMaxCharacters : processor.getMaxLineLength()),
    [wrap, lineMaxCharacters, processor]
  );
  const minWidth = wrap ? 0 : baseWidthRef.current + characterWidthRef.current * maxCharactersCount;

  // Recalculate line height and max characters
  const placeholderRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (placeholderRef.current) {
      placeholderRef.current.style.display = 'block';
      const placeholder = placeholderRef.current.children[0] as HTMLElement;
      const placeholderContent = Array.from(placeholder.querySelectorAll('*')).find(
        x => x.textContent === 'dummy'
      ) as HTMLElement;
      placeholderContent.style.whiteSpace = 'nowrap';
      placeholderContent.textContent = '0'.repeat(1000);
      const detectedCharacterWidth = placeholderContent.getBoundingClientRect().width / 1000;
      placeholderContent.textContent = '';
      placeholderContent.style.whiteSpace = '';
      placeholder.style.width = 'min-content';
      const detectedBaseWidth = placeholder.getBoundingClientRect().width;
      placeholder.style.width = '';
      placeholderContent.textContent = '\n'.repeat(total + 1001);
      const detectedLineHeight = placeholder.getBoundingClientRect().height / (total + 1000);
      placeholderContent.textContent = '';
      let detectedMaxCharacters = Infinity;
      if (wrap) {
        for (let i = 0; i < 10000; i += 1) {
          placeholderContent.textContent += '0';
          const newDetectedLineHeight = placeholder.clientHeight;
          if (Math.abs(newDetectedLineHeight - detectedLineHeight) > 1) {
            detectedMaxCharacters = i;
            break;
          }
        }
      }
      placeholderContent.textContent = 'dummy';
      placeholderRef.current.style.display = '';
      if (characterWidthRef.current !== detectedCharacterWidth) {
        characterWidthRef.current = detectedCharacterWidth;
        rerender();
      }
      if (baseWidthRef.current !== detectedBaseWidth) {
        baseWidthRef.current = detectedBaseWidth;
        rerender();
      }
      if (lineMaxCharactersRef.current !== detectedMaxCharacters) {
        lineMaxCharactersRef.current = detectedMaxCharacters;
        rerender();
      }
      if (lineHeightRef.current !== detectedLineHeight) {
        lineHeightRef.current = detectedLineHeight;
        rerender();
      }
    }
  }, [clientHeight, clientWidth, wrap]);

  // Limit the scrollTop
  const scrollTop = Math.min(domScrollTop, total * lineHeight - clientHeight);

  // TODO: Observe for the resize instead
  useInterval(() => {
    if (containerRef.current?.clientHeight !== clientHeight) {
      rerender();
    }
  }, 50);

  const viewportLines = Math.ceil(clientHeight / lineHeight);
  const viewportStart = Math.max(Math.floor(scrollTop / lineHeight) - prerender, 0);
  const viewportEnd = Math.min(viewportStart + viewportLines + 2 * prerender, total - 1);

  const [, setIncr] = useRafState(0);
  useEvent(
    'scroll',
    useLastCallback(() => {
      const newDomScrollTop = containerRef.current?.scrollTop || 0;
      const newScrollTop = Math.min(newDomScrollTop, total * lineHeight - clientHeight);
      const newViewportStart = Math.max(Math.floor(newScrollTop / lineHeight) - prerender, 0);
      if (newViewportStart !== viewportStart) {
        setIncr(Math.random());
      }
    }),
    containerRef?.current
  );

  // Compute current position
  const {index: start, start: visualStart} = useMemo(
    () => getVisualLine(viewportStart + 1),
    [processor, lineMaxCharacters, viewportStart]
  );
  const {index: end, end: visualEnd} = useMemo(
    () => getVisualLine(viewportEnd + 1),
    [processor, lineMaxCharacters, viewportEnd]
  );

  const beforeVisualLinesCount = visualStart;
  const afterVisualLinesCount = total - visualEnd;

  const displayedLines = useMemo(() => processor.getProcessedLines(start, end + 1), [processor, start, end]);

  const paddingTop = Math.max(0, Math.floor(beforeVisualLinesCount * lineHeight));
  const paddingBottom = Math.max(0, Math.floor(afterVisualLinesCount * lineHeight));
  const styleTop = useMemo(
    () => ({height: `${paddingTop}px`, width: `${minWidth}px`}),
    [beforeVisualLinesCount, paddingTop, minWidth]
  );
  const styleBottom = useMemo(() => ({height: `${paddingBottom}px`}), [afterVisualLinesCount, paddingBottom]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = scrollTop;
    }
  }, [scrollTop]);

  const scrollToLine = useLastCallback((line: number) => {
    const container = containerRef.current;
    if (container) {
      container.scrollTo(0, lineHeight * getTop(line) - container.clientHeight / 2 + lineHeight / 2);
    }
  });
  const getLineRect = useLastCallback((line: number) => ({
    top: getTop(line),
    height: getSize(line),
  }));
  const isScrolledToEnd = () => {
    return (
      Math.abs(
        containerRef.current?.scrollTop! + containerRef.current?.clientHeight! - containerRef.current?.scrollHeight!
      ) < 2
    );
  };
  const scrollToEnd = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo(0, containerRef.current?.scrollHeight);
    }
  };
  const getVisualLinesCount = useLastCallback(() => total);

  useImperativeHandle(
    ref,
    () => ({
      get container() {
        return containerRef.current;
      },
      isScrolledToStart() {
        return containerRef.current?.scrollTop === 0;
      },
      scrollToStart: () => {
        if (containerRef.current) {
          containerRef.current.scrollTo(0, 0);
        }
      },
      scrollToEnd,
      isScrolledToEnd,
      scrollToLine,
      getLineRect,
      getVisualLinesCount,
    }),
    []
  );

  // Emit dummy 'resize' event on client size change
  useEffect(() => {
    let t = setTimeout(() => containerRef.current?.dispatchEvent(new Event('resize')));
    return () => clearTimeout(t);
  }, [wrap, total]);

  // Scroll to bottom after logs change
  const scrolledToEnd = isScrolledToEnd();
  useEffect(() => {
    if (scrolledToEnd) {
      scrollToEnd();
    }
  }, [content]);

  useMount(scrollToEnd);

  return (
    <ConsoleContainer $wrap={wrap} ref={containerRef}>
      <ConsoleContent>
        <PlaceholderContainer ref={placeholderRef}>
          <LineComponent number={1} maxDigits={maxDigits}>
            dummy
          </LineComponent>
        </PlaceholderContainer>
        <ConsoleSpace style={styleTop} />
        <ConsoleLines lines={displayedLines} start={start} maxDigits={maxDigits} LineComponent={LineComponent} />
        <ConsoleSpace style={styleBottom} />
      </ConsoleContent>
    </ConsoleContainer>
  );
});
