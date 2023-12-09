import {useMemo, useRef} from 'react';

import {useLastCallback} from '@hooks/useLastCallback';

import {LogProcessor} from './LogProcessor';

interface VisualLine {
  index: number;
  start: number;
  end: number;
}

interface LogLinesPosition {
  getTop: (lineNumber: number) => number;
  getSize: (lineNumber: number) => number;
  getVisualLine: (visualLineNumber: number) => VisualLine;
  total: number;
}

export const useLogLinesPosition = (processor: LogProcessor, maxCharacters = Infinity): LogLinesPosition => {
  // Access basic data
  const lines = processor.lines;
  const isWrapped = maxCharacters !== Infinity && maxCharacters !== 0;

  // Store positions
  const cachedPositionsRef = useRef<number[]>([]);
  const cachedSizesRef = useRef<number[]>([]);

  // Recalculate positions
  const cachedMaxCharacters = useRef(maxCharacters);
  if (isWrapped) {
    cachedMaxCharacters.current = maxCharacters;
  }
  useMemo(() => {
    if (isWrapped) {
      if (cachedPositionsRef.current.length !== lines.length) {
        cachedPositionsRef.current = new Array(lines.length);
        cachedSizesRef.current = new Array(lines.length);
      }
      const cachedPositions = cachedPositionsRef.current;
      const cachedSizes = cachedSizesRef.current;
      let top = 0;
      for (let i = 0; i < lines.length; i += 1) {
        const chars = lines[i].chars;
        const height = chars === 0 ? 1 : Math.ceil(chars / maxCharacters);
        cachedSizes[i] = height;
        cachedPositions[i] = top;
        top += height;
      }
    }
  }, [cachedMaxCharacters.current, processor]);

  const getTop = (line: number): number => {
    if (line <= 0) {
      return 0;
    }
    if (line > lines.length) {
      line = lines.length;
    }
    return isWrapped ? cachedPositionsRef.current[line - 1] : line;
  };
  const getSize = (line: number) => {
    if (line <= 0 || line > lines.length) {
      return 0;
    }
    return isWrapped ? cachedSizesRef.current[line - 1] : 1;
  };
  const getVisualLine = (visualLine: number) => {
    if (visualLine < 1) {
      visualLine = 1;
    }
    if (!isWrapped) {
      return {index: visualLine - 1, start: visualLine - 1, end: visualLine};
    }
    let index = visualLine - 1;
    for (; index >= 0; index -= 1) {
      const top = cachedPositionsRef.current[index];
      if (top <= visualLine) {
        return {
          index,
          start: cachedPositionsRef.current[index],
          end: cachedPositionsRef.current[index] + cachedSizesRef.current[index],
        };
      }
    }
    return {
      index: 0,
      start: cachedPositionsRef.current[0],
      end: cachedPositionsRef.current[0] + cachedSizesRef.current[0],
    };
  };

  return {
    getTop: useLastCallback(getTop),
    getSize: useLastCallback(getSize),
    getVisualLine: useLastCallback(getVisualLine),
    total: getTop(lines.length) + getSize(lines.length),
  };
};
