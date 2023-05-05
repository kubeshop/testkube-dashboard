import {NamePath} from 'antd/lib/form/interface';

import {Option} from '@models/form';
import {Repository} from '@models/repository';
import {SecretRef} from '@models/secretRef';
import {SourceWithRepository} from '@models/sources';
import {Test} from '@models/test';

import {notificationCall} from '@molecules';

import {SourceType} from '@organisms/TestConfigurationForm/utils';

const customGitSourceString = '$custom-git-';

export const remapTestSources = (testSources: SourceWithRepository[]) => {
  return testSources.map(source => {
    const {name} = source;

    const optionValue = `${customGitSourceString}${name}`;
    const optionName = `Git source: ${name}`;

    return {...source, value: optionValue, label: optionName};
  });
};

export const testSourceBaseOptions: Option[] = [
  {value: 'git', label: 'Git'},
  {value: 'file-uri', label: 'File'},
  {value: 'string', label: 'String'},
];

export const getTestSourceSpecificFields = (values: any, isCustomGit?: boolean) => {
  const {testSource, username, token, string, file, ...rest} = values;

  if (rest.commit) {
    rest.branch = '';
  }

  if (rest.branch) {
    rest.commit = '';
  }

  if (isCustomGit) {
    return {
      repository: {...rest, uri: '', type: ''},
    };
  }

  if (testSource === 'string' || testSource === 'file-uri') {
    return {data: string || file.fileContent, repository: {}};
  }

  const secrets: {
    tokenSecret?: Partial<SecretRef>;
    token?: string;
    usernameSecret?: Partial<SecretRef>;
    username?: string;
  } = {};

  if (token !== undefined && token !== null) {
    if (token === '') {
      secrets.tokenSecret = {};
    } else if (!token.includes('*')) {
      secrets.token = token;
    }
  }

  if (username !== undefined && username !== null) {
    if (username === '') {
      secrets.usernameSecret = {};
    } else if (!username.includes('*')) {
      secrets.username = username;
    }
  }

  return {
    data: '',
    repository: {
      type: 'git',
      ...rest,
      ...secrets,
    },
  };
};

export const getSourcePayload = (values: any, testSources: SourceWithRepository[]) => {
  const {testSource} = values;
  const isCustomGit = testSource.includes(customGitSourceString);

  const testSourceSpecificFields = getTestSourceSpecificFields(values, isCustomGit);

  if (isCustomGit) {
    const isTestSourceExists = testSources.some(sourceItem => {
      return sourceItem.name === testSource.replace(customGitSourceString, '');
    });

    if (!isTestSourceExists) {
      notificationCall('failed', 'Provided test source does not exist');
    }
  } else {
    return {
      ...(testSource === 'file-uri' ? {type: 'string'} : isCustomGit ? {type: ''} : {type: testSource}),
      ...testSourceSpecificFields,
    };
  }
};

export const getCustomSourceField = (testSource: string) => {
  const isCustomTestSource = testSource.includes(customGitSourceString);

  return isCustomTestSource ? {source: testSource.replace(customGitSourceString, '')} : {source: ''};
};

export const dummySecret = '******';

type GetSourceFormValues = {
  source: string;
  branch?: string;
  commit?: string;
  path?: string;
  string?: string;
  token?: string;
  username?: string;
  tokenSecret?: Repository['tokenSecret'];
  usernameSecret?: Repository['usernameSecret'];
};

export const getSourceFormValues = (entityDetails: Test, testSources: SourceWithRepository[]): GetSourceFormValues => {
  const {content} = entityDetails;

  if (entityDetails.source) {
    const sourceDetails = testSources.find(source => source.name === entityDetails.source);

    return {
      source: `${customGitSourceString}${entityDetails.source}`,
      branch: content?.repository?.branch || sourceDetails?.repository?.branch,
      commit: content?.repository?.commit || sourceDetails?.repository?.commit,
      path: content?.repository?.path || sourceDetails?.repository?.commit,
    };
  }

  if (content.type === 'string') {
    return {
      source: content.type,
      string: content.data,
    };
  }

  const secrets: {
    token?: string;
    username?: string;
    tokenSecret?: Repository['tokenSecret'];
    usernameSecret?: Repository['usernameSecret'];
  } = {};

  if (content?.repository?.tokenSecret?.name) {
    secrets.token = dummySecret;
    secrets.tokenSecret = {...content?.repository?.tokenSecret, namespace: entityDetails?.namespace};
  }

  if (content?.repository?.usernameSecret?.name) {
    secrets.username = dummySecret;
    secrets.usernameSecret = {...content?.repository?.usernameSecret, namespace: entityDetails?.namespace};
  }

  return {
    source: content.type,
    ...content.repository,
    ...secrets,
  };
};

export const getSourceFieldValue = (getFieldValue: (name: NamePath) => SourceType) => {
  const testSourceValue = getFieldValue('testSource');

  if (!testSourceValue) {
    return '';
  }

  return testSourceValue.includes(customGitSourceString) ? 'custom' : testSourceValue;
};
