import {useMemo} from 'react';

export const countLines = (text: string): number => {
  let count = 1;
  for (let i = 0; i < text.length; i += 1) {
    if (text[i] === '\n') {
      count += 1;
    }
  }
  return count;
};

export const getLastLines = (text: string, lines: number): string => {
  let count = 0;
  for (let i = text.length - 1; i >= 0; i -= 1) {
    if (text[i] === '\n') {
      count += 1;
      if (lines === count) {
        return text.substring(i + 1);
      }
    }
  }
  return text;
};

export const useCountLines = (text: string) => useMemo(() => countLines(text), [text]);

export const useLastLines = (text: string, maxLines: number): string => {
  return useMemo(() => countLines(text) <= maxLines ? text : getLastLines(text, maxLines), [text, maxLines]);
};
