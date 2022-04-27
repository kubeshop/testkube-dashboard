/* eslint-disable no-empty */
import {Repository} from '@models/repository';
import {TestContent} from '@models/test';

import {githubUriRegex} from '@utils/strings';

export const purifyGitUriExtension = (gitUri: Repository['uri']) => {
  if (githubUriRegex.test(gitUri)) {
    return gitUri.replace('.git', '');
  }

  return gitUri;
};

export const buildGitTestDirUrl = (repository: Repository) => {
  const {uri, branch, path} = repository;

  const purifiedUri = purifyGitUriExtension(uri);

  const gitHubUri = `${purifiedUri}/tree/${branch}/${path}`;

  return gitHubUri;
};

export const getExecutionDefinitionData = (content: TestContent) => {
  const {type, repository, data, uri} = content;

  if (type === 'string') {
    return data;
  }

  if (type === 'git-dir') {
    const gitTestDirUri = buildGitTestDirUrl(repository);

    return gitTestDirUri;
  }

  // Will add later
  if (type === 'file-uri') {
  }
  if (type === 'git-file') {
  }
};
