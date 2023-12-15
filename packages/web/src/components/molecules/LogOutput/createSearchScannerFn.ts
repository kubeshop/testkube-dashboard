import {SearchResult} from '@store/logOutput';

/**
 * This function should not use any external references.
 *
 * It has to be a single function,
 * as it's serialized into Worker function.
 *
 * For the best performance:
 * - it's building a function that will be optimized by JS engine
 *
 * TODO: Ignore ASCII codes
 * TODO: Use previous results when it is substring
 */
export const createSearchScannerFn = (
  searchQuery: string,
  push: (data: SearchResult[] | {finished: true}) => void
): ((content: string) => void) => {
  let currentLineNumber = 1;
  let lineStartIndex = 0;

  const condition = searchQuery
    .split('')
    .map((char, i) => {
      const index = i === 0 ? 'i' : `i+${i}`;
      const lowerCondition = `c.charCodeAt(${index})===${char.toLowerCase().charCodeAt(0)}`;
      const upperCondition = `c.charCodeAt(${index})===${char.toUpperCase().charCodeAt(0)}`;
      return lowerCondition === upperCondition ? lowerCondition : `(${lowerCondition}||${upperCondition})`;
    })
    .join('&&');

  // @see {@link https://github.com/chalk/ansi-regex/blob/main/index.js}
  const pattern = [
    '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
    '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))',
  ].join('|');
  const ansiRegex = new RegExp(pattern, 'g');

  // eslint-disable-next-line no-new-func
  const scan = new Function(
    'l',
    'lineStart',
    'c',
    'postMessage',
    `
    var batch = 300;
    var queue = new Array(batch);
    var count = 0;
    var nextFlush = 50000;
    var flush = function () {
      nextFlush = (Math.floor(i / 50000) + 1) * 50000;
      if (count === batch) {
        postMessage(queue);
      } else if (count > 0) {
        postMessage(queue.slice(0, count));
        count = 0;
      }
    }
    var push = function (msg) {
      queue[count] = msg;
      count++;
      if (count === batch) {
        flush();
      }
    }
    var ansi = ${ansiRegex.toString()};
    var omitted = 0;
    for (var i = 0; i < c.length; i++) {
      if (c.charCodeAt(i) === 0x1b) {
        ansi.lastIndex = i;
        var result = ansi.exec(c);
        if (result && result.index === i) {
          i += result[0].length - 1;
          omitted += result[0].length;
        }
        continue;
      }
      if (${condition}) {
        push({line: l, start: i - omitted - lineStart, end: i - omitted - lineStart + ${searchQuery.length}});
      }
      if (c[i] === "\\n") {
        l++;
        lineStart = i + 1;
        omitted = 0;
      }
      if (i > nextFlush) {
        flush();
      }
    }
    flush();
    postMessage({finished: true});
    return [l, lineStart];
  `
  );
  return (content: string) => {
    [currentLineNumber, lineStartIndex] = scan(currentLineNumber, lineStartIndex, content, push);
  };
};
