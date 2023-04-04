import {createValidator} from './createValidator';

// Based on rules from {@link https://stackoverflow.com/a/12093994}
// eslint-disable-next-line no-control-regex
const gitBranchRegex = /^[^\/\\\u0000-\u001f\u007f ~^:?*\[](?:(?!\/\/|\.\.|\/\.|(\.lock$)|(\/$))[^\\\u0000-\u001f\u007f ~^:?*\[])*$/;

const IsGitBranchName = createValidator({
  name: 'gitBranchName',
  message: 'It should be valid branch name.',
  validate: (value) => gitBranchRegex.test(value),
});

export default IsGitBranchName;
