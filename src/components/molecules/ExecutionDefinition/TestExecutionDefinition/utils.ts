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

  let stringAfterTree = '';

  if (branch) {
    stringAfterTree += branch;
  }

  if (path) {
    stringAfterTree += `/${path}`;
  }

  const gitHubUri = `${purifiedUri}/tree/${stringAfterTree}`;

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
