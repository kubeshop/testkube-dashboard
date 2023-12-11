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
  useState,
} from 'react';
import {useEvent, usePrevious, useUpdate} from 'react-use';

import {escapeCarriageReturn} from 'escape-carriage';
import debounce from 'lodash.debounce';
import styled from 'styled-components';

import AnsiClassesMapping from '@atoms/TestkubeTheme/AnsiClassesMapping';

import {useLastCallback} from '@hooks/useLastCallback';

import {ConsoleLineDimensions, ConsoleLineTemplate} from '@molecules/Console/ConsoleLineTemplate';
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

  const [{baseWidth, characterWidth, maxCharacters, lineHeight}, setDimensions] = useState<ConsoleLineDimensions>({
    baseWidth: 0,
    characterWidth: 1000,
    maxCharacters: Infinity,
    lineHeight: 1000,
  });

  const {getTop, getSize, getVisualLine, total} = useLogLinesPosition(processor, maxCharacters);
  const getTopPx = (line: number) => lineHeight * getTop(line);
  const getCenterPx = (line: number) => getTopPx(line) + (getSize(line) * lineHeight) / 2;

  const getViewportTop = useLastCallback(() => Math.floor((containerRef.current?.scrollTop || 0) / lineHeight));
  const getViewportHeight = useLastCallback(() => Math.ceil((containerRef.current?.clientHeight || 0) / lineHeight));
  const getViewport = () => {
    const prerender = Math.max(Math.round(getViewportHeight() / 2), 30);
    const viewportStart = Math.max(getViewportTop() - prerender, 0);
    const viewportEnd = Math.min(viewportStart + getViewportHeight() + 2 * prerender, total - 1);
    return {start: viewportStart, end: viewportEnd};
  };
  const getViewportLast = () => Math.ceil(Math.min(1 + getViewportTop() + getViewportHeight(), total));

  // Keep information about line width
  const maxCharactersCount = useMemo(() => processor.getMaxLineLength(), [processor]);
  const minWidth = wrap ? 0 : baseWidth + characterWidth * maxCharactersCount;

  // Compute current position
  const {start: viewportStart, end: viewportEnd} = getViewport();
  const {index: start, start: visualStart} = useMemo(
    () => getVisualLine(viewportStart + 1),
    [processor, maxCharacters, viewportStart]
  );
  const {index: end, end: visualEnd} = useMemo(
    () => getVisualLine(viewportEnd + 1),
    [processor, maxCharacters, viewportEnd]
  );

  const displayed = useMemo(() => processor.getProcessedLines(start, end + 1), [processor, start, end]);

  const beforeCount = visualStart;
  const afterCount = total - visualEnd;
  const beforePx = Math.max(0, Math.floor(beforeCount * lineHeight));
  const afterPx = Math.max(0, Math.floor(afterCount * lineHeight));
  const styleTop = useMemo(() => ({height: `${beforePx}px`, width: `${minWidth}px`}), [beforePx, minWidth]);
  const styleBottom = useMemo(() => ({height: `${afterPx}px`}), [afterPx]);

  const scrollToLine = useLastCallback((line: number) => {
    containerRef.current?.scrollTo(0, getCenterPx(line) - containerRef.current?.clientHeight / 2);
  });
  const getLineRect = useLastCallback((line: number) => ({
    top: getTop(line),
    height: getSize(line),
  }));
  const isScrolledToEnd = useLastCallback(() => {
    const last = getViewportLast();
    return last === 1 || last === total;
  });
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

  // Keep the scroll position
  const clientHeight = containerRef.current?.clientHeight || 0;
  const domScrollTop = containerRef.current?.scrollTop || 0;
  const scrollTop = Math.min(domScrollTop, total * lineHeight - clientHeight);
  useLayoutEffect(() => {
    containerRef.current!.scrollTop = scrollTop;
  }, [scrollTop]);

  // Scroll to bottom after logs change
  const scrolledToEnd = getViewportLast() >= (usePrevious(total) || 0);
  useEffect(() => {
    if (scrolledToEnd) {
      scrollToEnd();
    }
  }, [content]);

  // Re-render on scroll
  const rerenderDebounce = useMemo(() => debounce(rerender, 5), []);
  const onScroll = useLastCallback(() => {
    const viewport = getViewport();
    if (viewport.start !== viewportStart || viewport.end !== viewportEnd) {
      rerenderDebounce();
    }
  });
  useEvent('scroll', onScroll, containerRef?.current);

  return (
    <ConsoleContainer $wrap={wrap} ref={containerRef}>
      <ConsoleContent>
        <ConsoleLineTemplate Component={LineComponent} maxDigits={maxDigits} wrap={wrap} onChange={setDimensions} />
        <ConsoleSpace style={styleTop} />
        <ConsoleLines lines={displayed} start={start} maxDigits={maxDigits} LineComponent={LineComponent} />
        <ConsoleSpace style={styleBottom} />
      </ConsoleContent>
    </ConsoleContainer>
  );
});
