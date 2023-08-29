import {createValidator} from './utils';

// Based on rules from {@link https://stackoverflow.com/a/12093994}
const gitBranchRegex =
  // eslint-disable-next-line no-control-regex
  /^[^\/\\\u0000-\u001f\u007f ~^:?*\[](?:(?!\/\/|\.\.|\/\.|(\.lock$)|(\/$))[^\\\u0000-\u001f\u007f ~^:?*\[])*$/;

export const GitBranchName = createValidator({
  name: 'gitBranchName',
  message: 'It should be valid branch name.',
  validate: value => gitBranchRegex.test(value),
});
