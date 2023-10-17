const {dirname, resolve, join} = require('node:path');
const {readdirSync, existsSync} = require('node:fs');
const micromatch = require('micromatch');
const glob = require('glob');

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

function escapeRegexWord(filePath) {
  return filePath.replace(/[^a-z0-9]/gi, $ => `\\${$}`);
}

const packages = readdirSync(join(__dirname, 'packages')).filter(name =>
  existsSync(join(__dirname, 'packages', name, 'jest.config.js'))
);

const projects = packages.map(name => ({
  ...readConfig(join(__dirname, 'packages', name, 'jest.config.js')),
  rootDir: join(__dirname, 'packages', name),
}));

const files = glob.sync(`${join(__dirname, 'packages')}/**`, {ignore: '**/node_modules/**'});

const coveragePatterns = projects.map(project =>
  (project.collectCoverageFrom || []).map(pattern => {
    if (pattern.includes('<rootDir>')) {
      return pattern.replace('<rootDir>', project.rootDir);
    }
    if (/^!?\//.test(pattern)) {
      return pattern;
    }
    return pattern.startsWith('!') ? `!${project.rootDir}/${pattern.substring(1)}` : `${project.rootDir}/${pattern}`;
  })
);

const coverageFiles = coveragePatterns.flatMap(patterns =>
  files.filter(filePath => micromatch.isMatch(filePath, patterns))
);

module.exports = {
  projects,
  // Hack to inherit coverage patterns from projects
  collectCoverageFrom: ['**/*.{ts,tsx}'],
  coveragePathIgnorePatterns: [
    `^(?!${escapeRegexWord(__dirname)}\\/${coverageFiles
      .map(filePath => filePath.replace(`${__dirname}/`, ''))
      .map(escapeRegexWord)
      .join('|')})$).*$`,
  ],
};
