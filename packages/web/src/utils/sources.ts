import {NamePath} from 'antd/lib/form/interface';

import {Option} from '@models/form';
import {Repository} from '@models/repository';
import {SecretRef} from '@models/secretRef';
import {SourceWithRepository} from '@models/sources';
import {Test} from '@models/test';

import {notificationCall} from '@molecules';
import {labelRegex} from '@molecules/LabelsSelect/utils';

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

export const getTestSourceSpecificFields = (values: any, isCustomGit?: boolean, namespace?: string) => {
  const {testSource, username, token, string, file, testType, name, ...rest} = values;

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
  const secrets = formatSecrets(token, username, namespace);

  return {
    data: '',
    repository: {
      type: 'git',
      ...rest,
      ...secrets,
    },
  };
};

export const getSourcePayload = (values: any, testSources: SourceWithRepository[], namespace?: string) => {
  const {testSource} = values;
  const isCustomGit = testSource.includes(customGitSourceString);

  const testSourceSpecificFields = getTestSourceSpecificFields(values, isCustomGit, namespace);

  if (isCustomGit) {
    const isTestSourceExists = testSources.some(sourceItem => {
      return sourceItem.name === testSource.replace(customGitSourceString, '');
    });

    if (!isTestSourceExists) {
      notificationCall('failed', 'Provided test source does not exist');
    }

    return testSourceSpecificFields;
  }
  return {
    ...(testSource === 'file-uri' ? {type: 'string'} : isCustomGit ? {type: ''} : {type: testSource}),
    ...testSourceSpecificFields,
  };
};

export const getCustomSourceField = (testSource: string) => {
  const isCustomTestSource = testSource.includes(customGitSourceString);

  return isCustomTestSource ? {source: testSource.replace(customGitSourceString, '')} : {source: ''};
};

export type GetSourceFormValues = {
  source: string;
  branch?: string;
  commit?: string;
  path?: string;
  string?: string;
  token?: Option | string;
  username?: Option | string;
};

export const getSourceFormValues = (entityDetails: Test, testSources: SourceWithRepository[]): GetSourceFormValues => {
  const {content} = entityDetails;

  if (!content?.type) {
    return {source: ''};
  }

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

  return {
    source: content.type,
    ...content.repository,
    ...getSecretsFromRepository(content?.repository),
  };
};

export const getSourceFieldValue = (getFieldValue: (name: NamePath) => SourceType) => {
  const testSourceValue = getFieldValue('testSource');

  if (!testSourceValue) {
    return '';
  }

  return testSourceValue.includes(customGitSourceString) ? 'custom' : testSourceValue;
};

export const formatSecrets = (token?: Option, username?: Option, namespace?: string) => {
  const secrets: {
    tokenSecret?: Partial<SecretRef>;
    token?: string;
    usernameSecret?: Partial<SecretRef>;
    username?: string;
  } = {};

  const tokenValue = String(token?.value);
  const usernameValue = String(username?.value);

  if (token) {
    if (labelRegex.test(tokenValue)) {
      const [secretName, key] = tokenValue.split(':');
      secrets.tokenSecret = {name: secretName, key, namespace};
    } else {
      secrets.token = tokenValue;
    }
  }

  if (username) {
    if (labelRegex.test(usernameValue)) {
      const [secretName, key] = usernameValue.split(':');
      secrets.usernameSecret = {name: secretName, key, namespace};
    } else {
      secrets.username = usernameValue;
    }
  }
  return secrets;
};

export const getSecretsFromRepository = (repository?: Repository) => {
  const secrets: {
    token?: Option;
    username?: Option;
  } = {};

  const tokenSecret = repository?.tokenSecret;
  if (tokenSecret?.name) {
    const keyValuePair = `${tokenSecret.name}:${tokenSecret.key}`;
    secrets.token = {value: keyValuePair, label: keyValuePair};
  }

  const usernameSecret = repository?.usernameSecret;
  if (usernameSecret?.name) {
    const keyValuePair = `${usernameSecret.name}:${usernameSecret.key}`;
    secrets.username = {value: keyValuePair, label: keyValuePair};
  }

  return secrets;
};
