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

export const useCountLines = (text: string) => useMemo(() => countLines(text), [text]);
