module.exports = {
  importOrder: [
    '^@sentry',
    '^react',
    '^(antd|@ant-design)',
    '^@reduxjs',
    '<THIRD_PARTY_MODULES>',
    '^@testkube/plugins',
    '^@testkube/plugin-',
    '^@testkube/',
    '^@plugin/',
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
