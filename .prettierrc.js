const {loadConfig: loadTsConfig} = require('tsconfig-paths');

const paths = Object.keys(loadTsConfig('./tsconfig.json').paths)
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
    ...paths.flatMap(path => [`^${path}`, `^${path}/`]),
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
  jsxBracketSameLine: false,
  proseWrap: 'always',
  quoteProps: 'as-needed',
  tabWidth: 2,
  useTabs: false,
};
