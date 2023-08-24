const {loadConfig: loadTsConfig} = require('tsconfig-paths');

const {join} = require('node:path');

const original = Object.keys(loadTsConfig(join(__dirname, 'tsconfig.json')).paths);
const paths = original
  .map(path => path.replace(/\/\*$/, ''))
  .sort()
  .filter((x, i, a) => a.indexOf(x) === i);

module.exports = {
  importOrder: [
    '^@sentry',
    '^react',
    '^(antd|@ant-design)',
    '^@reduxjs',
    '<THIRD_PARTY_MODULES>',
    ...paths.flatMap(path => original.includes(path) ? [`^${path}`, `^${path}/`] : [`^${path}/`]),
    '^\\.\\.(\\/)?',
    '^\\.\\/',
    '^.$',
  ],

  importOrderSeparation: true,
  importOrderSortSpecifiers: true,

  singleQuote: true,
  arrowParens: 'avoid',
  semi: true,
  printWidth: 120,
  trailingComma: 'es5',
  bracketSpacing: false,
  bracketSameLine: false,
  proseWrap: 'always',
  quoteProps: 'as-needed',
  tabWidth: 2,
  useTabs: false,
};
