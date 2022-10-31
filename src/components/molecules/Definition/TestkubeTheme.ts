import Colors from '@styles/Colors';

export default {
  'code[class*="language-"]': {
    color: '#a9b7c6',
    fontFamily: 'Consolas, Monaco, monospace',
    wordSpacing: 'normal',
    lineHeight: '1.5',
    MozTabSize: '4',
    OTabSize: '4',
    tabSize: '4',
  },
  'pre[class*="language-"]': {
    color: '#a9b7c6',
    fontFamily: 'Consolas, Monaco, monospace',
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
    background: '#2b2b2b',
    padding: '.1em',
    borderRadius: '.3em',
  },
  comment: {
    color: '#808080',
  },
  prolog: {
    color: '#808080',
  },
  cdata: {
    color: '#808080',
  },
  delimiter: {
    color: Colors.amber600,
  },
  boolean: {
    color: Colors.sky500,
  },
  keyword: {
    color: Colors.amber600,
  },
  selector: {
    color: Colors.amber600,
  },
  important: {
    color: Colors.amber600,
  },
  atrule: {
    color: Colors.amber600,
  },
  operator: {
    color: '#a9b7c6',
  },
  punctuation: {
    color: '#a9b7c6',
  },
  'attr-name': {
    color: '#a9b7c6',
  },
  tag: {
    color: '#e8bf6a',
  },
  'tag.punctuation': {
    color: '#e8bf6a',
  },
  doctype: {
    color: '#e8bf6a',
  },
  builtin: {
    color: '#e8bf6a',
  },
  entity: {
    color: Colors.sky500,
  },
  number: {
    color: Colors.sky500,
  },
  symbol: {
    color: Colors.sky500,
  },
  property: {
    color: '#9876aa',
  },
  constant: {
    color: '#9876aa',
  },
  variable: {
    color: '#9876aa',
  },
  string: {
    color: Colors.lime500,
  },
  char: {
    color: Colors.lime500,
  },
  'attr-value': {
    color: '#a5c261',
  },
  'attr-value.punctuation': {
    color: '#a5c261',
  },
  'attr-value.punctuation:first-child': {
    color: '#a9b7c6',
  },
  url: {
    color: '#287bde',
    textDecoration: 'underline',
  },
  function: {
    color: '#ffc66d',
  },
  regex: {
    background: '#364135',
  },
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
  inserted: {
    background: '#294436',
  },
  deleted: {
    background: '#484a4a',
  },
  'code.language-css .token.property': {
    color: '#a9b7c6',
  },
  'code.language-css .token.property + .token.punctuation': {
    color: '#a9b7c6',
  },
  'code.language-css .token.id': {
    color: '#ffc66d',
  },
  'code.language-css .token.selector > .token.class': {
    color: '#ffc66d',
  },
  'code.language-css .token.selector > .token.attribute': {
    color: '#ffc66d',
  },
  'code.language-css .token.selector > .token.pseudo-class': {
    color: '#ffc66d',
  },
  'code.language-css .token.selector > .token.pseudo-element': {
    color: '#ffc66d',
  },
};
