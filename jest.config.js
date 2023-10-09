const {dirname, resolve, join} = require('node:path');
const {readdirSync, existsSync} = require('node:fs');

function readConfig(filePath) {
  const absFilePath = resolve(filePath);
  const prevCwd = process.cwd();
  process.chdir(dirname(absFilePath));
  Object.keys(require.cache).forEach(key => {
    delete require.cache[key];
  });
  // eslint-disable-next-line import/no-dynamic-require, global-require
  const result = require(absFilePath);
  process.chdir(prevCwd);
  return result;
}

const packages = readdirSync(join(__dirname, 'packages')).filter(name =>
  existsSync(join(__dirname, 'packages', name, 'jest.config.js'))
);

module.exports = {
  projects: packages.map(name => readConfig(join(__dirname, 'packages', name, 'jest.config.js'))),
};
