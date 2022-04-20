import {TestContent} from '@models/test';

import {getExecutionDefinitionData, purifyGitUriExtension} from './utils';

const mockedTestStringTypeContent: TestContent = {
  type: 'string',
  data: 'someData',
  uri: 'someUri',
  repository: {
    type: 'git',
    uri: 'someUri',
    branch: 'someBranch',
    path: 'somePath',
  },
};

const mockedTestGitDirTypeContent: TestContent = {
  type: 'git-dir',
  data: 'someData',
  uri: 'https://somegituri.git',
  repository: {
    type: 'git',
    uri: 'https://somegituri.git',
    branch: 'someBranch',
    path: 'somePath',
  },
};

describe('test execution definition tests', () => {
  describe('purifyGitUriExtension tests', () => {
    test('purifyGitUriExtension returns a purified git uri if it contains .git extension', () => {
      const givenGithubUri = 'https//somegithubrepo.git';
      const targetGithubUri = 'https//somegithubrepo';

      expect(purifyGitUriExtension(givenGithubUri)).toStrictEqual(targetGithubUri);
    });

    test('purifyGitUriExtension returns a given git uri if it does not contain .git extension', () => {
      const givenGithubUri = 'https//somegithubrepo';
      const targetGithubUri = 'https//somegithubrepo';

      expect(purifyGitUriExtension(givenGithubUri)).toStrictEqual(targetGithubUri);
    });
  });

  describe('getExecutionDefinitionData tests', () => {
    test('getExecutionDefinitionData returns a valid data if test content type is string', () => {
      const targetResult = 'someData';

      expect(getExecutionDefinitionData(mockedTestStringTypeContent)).toStrictEqual(targetResult);
    });

    test('getExecutionDefinitionData returns a valid data if test content type is git-dir and uri has .git extension', () => {
      const targetResult = 'https://somegituri/tree/someBranch/somePath';

      expect(getExecutionDefinitionData(mockedTestGitDirTypeContent)).toStrictEqual(targetResult);
    });
  });
});
