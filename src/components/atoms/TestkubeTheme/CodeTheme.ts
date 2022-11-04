import Colors from '@styles/Colors';

export default {
  'code[class*="language-"]': {
    color: Colors.slate200,
    fontFamily: 'Roboto Mono, Monaco, monospace',
    wordSpacing: 'normal',
    lineHeight: '1.5',
    MozTabSize: '4',
    OTabSize: '4',
    tabSize: '4',
  },
  'pre[class*="language-"]': {
    color: Colors.slate200,
    fontFamily: 'Roboto Mono, Monaco, monospace',
    wordSpacing: 'normal',
    lineHeight: '1.5',
    MozTabSize: '4',
    OTabSize: '4',
    tabSize: '4',
    padding: '1em',
    margin: '.5em 0',
    overflow: 'auto',
    background: Colors.slate800,
  },
  'pre[class*="language-"]::-moz-selection': {
    color: 'inherit',
    background: 'rgba(33, 66, 131, .85)',
  },
  'pre[class*="language-"] ::-moz-selection': {
    color: 'inherit',
    background: 'rgba(33, 66, 131, .85)',
  },
  'code[class*="language-"]::-moz-selection': {
    color: 'inherit',
    background: 'rgba(33, 66, 131, .85)',
  },
  'code[class*="language-"] ::-moz-selection': {
    color: 'inherit',
    background: 'rgba(33, 66, 131, .85)',
  },
  'pre[class*="language-"]::selection': {
    color: 'inherit',
    background: 'rgba(33, 66, 131, .85)',
  },
  'pre[class*="language-"] ::selection': {
    color: 'inherit',
    background: 'rgba(33, 66, 131, .85)',
  },
  'code[class*="language-"]::selection': {
    color: 'inherit',
    background: 'rgba(33, 66, 131, .85)',
  },
  'code[class*="language-"] ::selection': {
    color: 'inherit',
    background: 'rgba(33, 66, 131, .85)',
  },
  ':not(pre) > code[class*="language-"]': {
    background: Colors.slate700,
    padding: '.1em',
    borderRadius: '.3em',
  },
  comment: {
    color: Colors.slate500,
  },
  prolog: {
    color: Colors.slate300,
  },
  cdata: {
    color: Colors.slate300,
  },
  delimiter: {
    color: Colors.amber400,
  },
  boolean: {
    color: Colors.sky300,
  },
  keyword: {
    color: Colors.amber400,
  },
  selector: {
    color: Colors.lime300,
  },
  important: {
    color: Colors.amber400,
  },
  atrule: {
    color: Colors.amber400,
  },
  operator: {
    color: Colors.yellow300,
  },
  punctuation: {
    color: Colors.slate400,
  },
  'attr-name': {
    color: Colors.slate100,
  },
  tag: {
    color: Colors.amber400,
  },
  'tag.punctuation': {
    color: Colors.slate400,
  },
  doctype: {
    color: Colors.amber300,
  },
  builtin: {
    color: Colors.amber300,
  },
  entity: {
    color: Colors.sky300,
  },
  number: {
    color: Colors.sky300,
  },
  symbol: {
    color: Colors.sky300,
  },
  property: {
    color: Colors.amber400,
  },
  constant: {
    color: Colors.indigo400,
  },
  variable: {
    color: Colors.violet400,
  },
  string: {
    color: Colors.lime400,
  },
  char: {
    color: Colors.lime400,
  },
  'attr-value': {
    color: Colors.lime500,
  },
  'attr-value.punctuation': {
    color: Colors.lime500,
  },
  'attr-value.punctuation:first-child': {
    color: Colors.slate100,
  },
  url: {
    color: Colors.indigo400,
    textDecoration: 'underline',
  },
  function: {
    color: Colors.rose400,
  },
  regex: {
    background: Colors.slate700,
  },
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
  inserted: {
    background: Colors.lime900,
  },
  deleted: {
    background: Colors.rose900,
  },
  'code.language-css .token.property': {
    color: Colors.slate100,
  },
  'code.language-css .token.property + .token.punctuation': {
    color: Colors.slate100,
  },
  'code.language-css .token.id': {
    color: Colors.amber300,
  },
  'code.language-css .token.selector > .token.class': {
    color: Colors.amber300,
  },
  'code.language-css .token.selector > .token.attribute': {
    color: Colors.amber300,
  },
  'code.language-css .token.selector > .token.pseudo-class': {
    color: Colors.amber300,
  },
  'code.language-css .token.selector > .token.pseudo-element': {
    color: Colors.amber300,
  },
};
