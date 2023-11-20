const {loadConfig: loadTsConfig} = require('tsconfig-paths');

const {join} = require('node:path');

const original = Object.keys(loadTsConfig(join(__dirname, 'tsconfig.json')).paths);
const paths = original
  .map(path => path.replace(/\/\*$/, ''))
  .sort()
  .filter((x, i, a) => a.indexOf(x) === i);

module.exports = {
  ...require('../../.prettierrc'),
  importOrder: [
    '^@sentry',
    '^react',
    '^(antd|@ant-design)',
    '^@reduxjs',
    '<THIRD_PARTY_MODULES>',
    '^@testkube/plugins',
    '^@testkube/plugin-',
    '^@testkube/',
    ...paths.flatMap(path => (original.includes(path) ? [`^${path}`, `^${path}/`] : [`^${path}/`])),
    '^\\.\\.(\\/)?',
    '^\\.\\/',
    '^.$',
  ],
};
