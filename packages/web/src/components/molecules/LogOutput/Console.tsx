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
import {useEvent, useInterval, useUpdate} from 'react-use';

import Anser, {AnserJsonEntry} from 'anser';
import {escapeCarriageReturn} from 'escape-carriage';
import debounce from 'lodash.debounce';
import styled from 'styled-components';

import AnsiClassesMapping from '@atoms/TestkubeTheme/AnsiClassesMapping';

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
  width: min-content;
  min-width: 100%;
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

const PlaceholderContainer = styled.div`
  display: none;
`;

const countVisualLines = (lines: {chars: number}[], maxCharacters: number, start = 0, end = lines.length): number => {
  if (!Number.isFinite(maxCharacters) || maxCharacters === 0) {
    return end - start;
  }
  if (end > lines.length) {
    end = lines.length;
  }
  let count = 0;
  for (let i = start; i < end; i += 1) {
    if (lines[i].chars === 0) {
      count += 1;
    } else {
      count += Math.ceil(lines[i].chars / maxCharacters);
    }
  }
  return count;
};

// TODO: Optimize to process only newly added content
export const Console = forwardRef<ConsoleRef, ConsoleProps>(({content, wrap, LineComponent = ConsoleLine}, ref) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lines = useMemo(() => ansiToLines(escapeCarriageReturn(content)), [content]);
  const maxDigits = `${lines.length + 1}`.length;

  const rerender = useUpdate();

  // Configure
  const prerender = 10;

  // Keep information about line display
  const lineHeightRef = useRef(1000);
  const lineHeight = lineHeightRef.current;

  // Keep information about lines
  const lineMaxCharactersRef = useRef(Infinity);
  const lineMaxCharacters = lineMaxCharactersRef.current;

  // Count max visual lines
  const totalVisualLinesCount = useMemo(() => countVisualLines(lines, lineMaxCharacters), [lines, lineMaxCharacters]);

  // Get information about current viewport
  const clientHeight = containerRef.current?.clientHeight || 0;
  const clientWidth = containerRef.current?.clientWidth || 0;
  const domScrollTop = containerRef.current?.scrollTop || 0;

  // Recalculate line height and max characters
  const placeholderRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (placeholderRef.current) {
      placeholderRef.current.style.display = 'block';
      const placeholder = placeholderRef.current.children[0];
      const placeholderContent = Array.from(placeholder.querySelectorAll('*')).find(x => x.textContent === 'dummy')!;
      placeholderContent.textContent = '\n'.repeat(totalVisualLinesCount + 1);
      const detectedLineHeight = placeholder.getBoundingClientRect().height / totalVisualLinesCount;
      let detectedMaxCharacters = Infinity;
      if (wrap) {
        for (let i = 1; i < 10000; i += 1) {
          placeholderContent.textContent += '0';
          const newDetectedLineHeight = placeholder.getBoundingClientRect().height;
          if (newDetectedLineHeight !== detectedLineHeight) {
            detectedMaxCharacters = i - 1;
            break;
          }
        }
      }
      placeholderContent.textContent = 'dummy';
      placeholderRef.current.style.display = '';
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
  const start = Math.max(0, Math.floor(scrollTop / lineHeight) - prerender);
  const end = Math.min(start + viewportLines + 2 * prerender, lines.length);

  const beforeVisualLinesCount = useMemo(
    () => countVisualLines(lines, lineMaxCharacters, 0, start),
    [lines, lineMaxCharacters, start]
  );
  const afterVisualLinesCount = useMemo(
    () => countVisualLines(lines, lineMaxCharacters, end),
    [lines, lineMaxCharacters, end]
  );

  const displayedLines = useMemo(() => lines.slice(start, end), [start, end, lines]);

  const paddingTop = Math.max(0, Math.floor(beforeVisualLinesCount * lineHeight));
  const paddingBottom = Math.max(0, Math.floor(afterVisualLinesCount * lineHeight));
  const styleTop = useMemo(() => ({height: `${paddingTop}px`}), [beforeVisualLinesCount, paddingTop]);
  const styleBottom = useMemo(() => ({height: `${paddingBottom}px`}), [afterVisualLinesCount, paddingBottom]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = scrollTop;
    }
  }, [scrollTop]);

  useImperativeHandle(
    ref,
    () => ({
      get container() {
        return containerRef.current;
      },
      isScrolledToStart() {
        return containerRef.current?.scrollTop === 0;
      },
      isScrolledToEnd() {
        return (
          Math.abs(
            containerRef.current?.scrollTop! + containerRef.current?.clientHeight! - containerRef.current?.scrollHeight!
          ) < 2
        );
      },
      scrollToStart: () => {
        if (containerRef.current) {
          containerRef.current.scrollTop = 0;
        }
      },
      scrollToEnd: () => {
        if (containerRef.current) {
          // FIXME: For some reason with bigger number of lines - need to be called twice
          containerRef.current.scrollTop = containerRef.current?.scrollHeight;
        }
      },
      scrollToLine: line => {
        const container = containerRef.current;
        if (container) {
          container.scrollTo(
            container.scrollLeft,
            lineHeight * (countVisualLines(lines, lineMaxCharacters, 0, line) - 1) -
              container.clientHeight / 2 +
              lineHeight / 2
          );
        }
      },
    }),
    [lines, wrap, lineHeight, lineMaxCharacters]
  );

  return (
    <ConsoleContainer $wrap={wrap} ref={containerRef}>
      <div style={styleTop}>
        <PlaceholderContainer ref={placeholderRef}>
          <LineComponent number={1} maxDigits={maxDigits}>
            dummy
          </LineComponent>
        </PlaceholderContainer>
      </div>
      {displayedLines.map((line, lineIndex) => (
        // eslint-disable-next-line react/no-array-index-key
        <LineComponent key={start + lineIndex} number={start + lineIndex + 1} maxDigits={maxDigits}>
          {line.nodes}
        </LineComponent>
      ))}
      <div style={styleBottom} />
    </ConsoleContainer>
  );
});
