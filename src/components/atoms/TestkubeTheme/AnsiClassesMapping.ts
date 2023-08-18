import {range} from 'lodash';

import Colors from '@styles/Colors';

const foregrounds = {
  black: [Colors.slate600, Colors.slate400],
  white: [Colors.slate400, Colors.slate200],
  red: [Colors.rose500, Colors.rose300],
  green: [Colors.lime500, Colors.lime300],
  yellow: [Colors.yellow500, Colors.yellow300],
  blue: [Colors.sky500, Colors.sky300],
  magenta: [Colors.pink500, Colors.pink300],
  cyan: [Colors.cyan500, Colors.cyan300],
};

const backgrounds = {
  black: [Colors.slate200, Colors.slate100],
  white: [Colors.slate200, Colors.slate100],
  red: [Colors.rose900, Colors.rose700],
  green: [Colors.lime900, Colors.lime700],
  yellow: [Colors.yellow900, Colors.yellow600],
  blue: [Colors.sky900, Colors.sky700],
  magenta: [Colors.pink900, Colors.pink700],
  cyan: [Colors.cyan900, Colors.cyan500],
};

const baseTextCss = Object.entries(foregrounds)
  .flatMap(([color, [base, bright]]) => [
    `.ansi-${color}-fg {color: ${base}}`,
    `.ansi-bright-${color}-fg {color: ${bright}}`,
  ])
  .join('\n');

const baseBackgroundCss = Object.entries(backgrounds)
  .flatMap(([color, [base, bright]]) => [
    `.ansi-${color}-bg {background: ${base}}`,
    `.ansi-bright-${color}-bg {background: ${bright}}`,
  ])
  .join('\n');

const ansiSteps = [0, 95, 135, 175, 215, 255];
const ansiCss = range(16, 232)
  .flatMap(color => {
    const index = color - 16;
    const b = index % 6;
    const g = Math.floor(index / 6) % 6;
    const r = Math.floor(index / 36) % 6;
    const rgb = `rgb(${ansiSteps[r]}, ${ansiSteps[g]}, ${ansiSteps[b]})`;
    return [`.ansi-palette-${color}-fg {color: ${rgb}}`, `.ansi-palette-${color}-bg {background: ${rgb}}`];
  })
  .join('\n');

const ansiGrayscaleCss = range(232, 256)
  .flatMap(color => {
    const index = color - 232;
    const value = 8 + index * 10;
    const rgb = `rgb(${value}, ${value}, ${value})`;
    return [`.ansi-palette-${color}-fg {color: ${rgb}}`, `.ansi-palette-${color}-bg {background: ${rgb}}`];
  })
  .join('\n');

export default `
  ${baseBackgroundCss}
  ${baseTextCss}
  ${ansiCss}
  ${ansiGrayscaleCss}
`;
