export const ANSI_MARKER = String.fromCharCode(0x1b);

const ansiRegex = /([!\x3c-\x3f]*)([\d;]*)([\x20-\x2c]*[\x40-\x7e])/g;
export const countCharacters = (content: string, start: number, end: number): number => {
  let codes = 0;
  for (let i = start; i < end; i += 1) {
    if (content[i] === ANSI_MARKER) {
      i += 2;
      ansiRegex.lastIndex = i;
      const match = ansiRegex.exec(content);
      if (match !== null && match.index === i) {
        const len = match[0].length;
        codes += len + 2;
        i += len - 1;
      }
    }
  }
  return end - start - codes;
};
