import {
  FC,
  PropsWithChildren,
  ReactElement,
  cloneElement,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';
import {useEvent, useInterval, useMount, useUpdate} from 'react-use';

import Anser, {AnserJsonEntry} from 'anser';
import {escapeCarriageReturn} from 'escape-carriage';
import debounce from 'lodash.debounce';
import styled from 'styled-components';

import AnsiClassesMapping from '@atoms/TestkubeTheme/AnsiClassesMapping';

import {useLastCallback} from '@hooks/useLastCallback';

import {LogProcessor} from '@molecules/Console/LogProcessor';

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
  getLineRect: (line: number) => {top: number; height: number};
  scrollToStart: () => void;
  scrollToEnd: () => void;
  scrollToLine: (line: number) => void;
  isScrolledToStart: () => boolean;
  isScrolledToEnd: () => boolean;
}

function createClass(bundle: AnserJsonEntry): string | undefined {
  let classNames: string = '';

  if (bundle.bg) {
    classNames += `${bundle.bg}-bg `;
  }
  if (bundle.fg) {
    classNames += `${bundle.fg}-fg `;
  }
  if (bundle.decoration) {
    classNames += `ansi-${bundle.decoration} `;
  }

  return classNames ? classNames.substring(0, classNames.length - 1) : undefined;
}

const ansiToLines = (input: string) => {
  const anser = new Anser();
  const options = {json: true, remove_empty: true, use_classes: true};
  const lines: {chars: number; nodes: ReactElement[]}[] = [];

  // Parse
  let line: {chars: number; nodes: ReactElement[]} = {chars: 0, nodes: []};
  let lastIndex = 0;
  let className: string | undefined;
  let isEscaping = false;
  const apply = (i: number) => {
    if (lastIndex === i) {
      return;
    }
    const content = input.substring(lastIndex, i);
    if (isEscaping) {
      const match = anser.processChunkJson(content, options, true);
      const newClassName = createClass(match);
      isEscaping = false;
      line.chars += match.content.length;
      // Optimize for cases where consecutive characters have same color codes
      if (newClassName === className && match.content !== '' && line.nodes.length) {
        line.nodes[line.nodes.length - 1] = cloneElement(
          line.nodes[line.nodes.length - 1],
          {},
          line.nodes[line.nodes.length - 1].props.children + match.content
        );
      } else if (match.content !== '') {
        className = newClassName;
        line.nodes.push(
          <span key={line.nodes.length} className={className}>
            {match.content}
          </span>
        );
      }
    } else {
      line.chars += content.length;
      line.nodes.push(
        <span key={line.nodes.length} className={className}>
          {content}
        </span>
      );
    }
    lastIndex = i;
  };
  for (let i = 0; i < input.length; i += 1) {
    if (input[i] === '\n') {
      apply(i + 1);
      line.chars -= 1;
      lines.push(line);
      line = {chars: 0, nodes: []};
    } else if (input.charCodeAt(i) === 0x1b && input[i + 1] === '[') {
      apply(i);
      isEscaping = true;
      i += 1;
      lastIndex = i + 1;
    }
  }

  apply(input.length);
  if (line.chars > 0) {
    lines.push(line);
  }
  return lines;
};

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

  // Count max visual lines
  const totalVisualLinesCount = useMemo(
    () => processor.countVisualLines(lineMaxCharacters),
    [processor, lineMaxCharacters]
  );

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
      placeholderContent.textContent = '\n'.repeat(totalVisualLinesCount + 1001);
      const detectedLineHeight = placeholder.getBoundingClientRect().height / (totalVisualLinesCount + 1000);
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
  const scrollTop = Math.min(domScrollTop, totalVisualLinesCount * lineHeight - clientHeight);

  // TODO: Observe for the resize instead
  useInterval(() => {
    if (containerRef.current?.clientHeight !== clientHeight) {
      rerender();
    }
  }, 50);

  // TODO: Rerender only on actual change
  const rerenderDebounce = useMemo(() => debounce(rerender, 5), []);
  useEvent('scroll', rerenderDebounce, containerRef?.current);

  // Compute current position
  const viewportLines = Math.ceil(clientHeight / lineHeight);
  const viewportStart = Math.floor(scrollTop / lineHeight) - prerender;
  const viewportEnd = viewportStart + viewportLines + 2 * prerender;
  // TODO: getEstimatedVisualLineAt? getVisualRangeAt? getEstimatedVisualRangeAt?
  const {index: start, start: visualStart} = useMemo(
    () => processor.getVisualLineAt(lineMaxCharacters, viewportStart),
    [processor, lineMaxCharacters, viewportStart]
  );
  const {index: end, end: visualEnd} = useMemo(
    () => processor.getVisualLineAt(lineMaxCharacters, viewportEnd),
    [processor, lineMaxCharacters, viewportEnd]
  );

  const beforeVisualLinesCount = visualStart;
  const afterVisualLinesCount = totalVisualLinesCount - visualEnd;

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
      container.scrollTo(
        0,
        lineHeight * processor.countVisualLines(lineMaxCharacters, 0, line - 1) -
          container.clientHeight / 2 +
          lineHeight / 2
      );
    }
  });
  const getLineRect = useLastCallback((line: number) => {
    const container = containerRef.current;
    if (container) {
      return {
        top: lineHeight * processor.countVisualLines(lineMaxCharacters, 0, line - 1),
        height: lineHeight * processor.countVisualLines(lineMaxCharacters, line, line - 1),
      };
    }
    return {top: NaN, height: NaN};
  });
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
    }),
    []
  );

  // Emit dummy 'resize' event on client size change
  useEffect(() => {
    let t = setTimeout(() => containerRef.current?.dispatchEvent(new Event('resize')));
    return () => clearTimeout(t);
  }, [wrap, totalVisualLinesCount]);

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
        {displayedLines.map((line, lineIndex) => (
          // eslint-disable-next-line react/no-array-index-key
          <LineComponent key={start + lineIndex} number={start + lineIndex + 1} maxDigits={maxDigits}>
            {line.nodes}
          </LineComponent>
        ))}
        <ConsoleSpace style={styleBottom} />
      </ConsoleContent>
    </ConsoleContainer>
  );
});
