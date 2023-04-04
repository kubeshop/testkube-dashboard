import {NamePath} from 'antd/lib/form/interface';

import {Option} from '@models/form';
import {SourceWithRepository} from '@models/sources';

import {notificationCall} from '@molecules';

const customGitString = '$custom-git-';

export const remapTestSources = (testSources: SourceWithRepository[]) => {
  if (!testSources || !testSources.length) {
    return [];
  }

  const array: Option[] = [];

  testSources.forEach(source => {
    const {name} = source;

    const optionValue = `${customGitString}${name}`;
    const optionName = `Git source: ${name}`;

    array.push({value: optionValue, label: optionName});
  });

  return array;
};

export const testSourceBaseOptions: Option[] = [
  {value: 'git', label: 'Git'},
  {value: 'file-uri', label: 'File'},
  {value: 'string', label: 'String'},
];

export const getTestSourceSpecificFields = (values: any, isCustomGit?: boolean) => {
  const {testSource} = values;

  if (isCustomGit) {
    return {
      repository: {
        ...(values.path ? {path: values.path} : {}),
        ...(values.branch ? {branch: values.branch} : {}),
        uri: '',
        type: '',
      },
    };
  }

  if (testSource === 'string' || testSource === 'file-uri') {
    return {data: values.string || values.file.fileContent, repository: {}};
  }

  const secrets = (() => {
    const result: any = {};

    if (values.token !== undefined && values.token !== null) {
      if (values.token === '') {
        result.tokenSecret = {};
      } else if (!values.token.includes('*')) {
        result.token = values.token;
      }
    }

    if (values.username !== undefined) {
      if (values.username === '') {
        result.usernameSecret = {};
      } else if (!values.username.includes('*')) {
        result.username = values.username;
      }
    }

    return result;
  })();

  return {
    data: '',
    repository: {
      type: 'git',
      uri: values.uri,
      ...(values.path ? {path: values.path} : {}),
      ...(values.branch ? {branch: values.branch} : {}),
      ...secrets,
    },
  };
};

export const getSourcePayload = (values: any, testSources: SourceWithRepository[]) => {
  const {testSource} = values;
  const isTestSourceCustomGitDir = testSource.includes(customGitString);

  const testSourceSpecificFields = getTestSourceSpecificFields(values, isTestSourceCustomGitDir);

  if (isTestSourceCustomGitDir) {
    const isTestSourceExists = testSources.some(sourceItem => {
      return sourceItem.name === testSource.replace(customGitString, '');
    });

    if (!isTestSourceExists) {
      notificationCall('failed', 'Provided test source does not exist');
      return;
    }
  }

  return {
    ...(testSource === 'file-uri' ? {type: 'string'} : isTestSourceCustomGitDir ? {type: ''} : {type: testSource}),
    ...testSourceSpecificFields,
  };
};

export const getCustomSourceField = (testSource: string, prevTestSource?: string) => {
  const isCustomTestSource = testSource.includes(customGitString);

  return isCustomTestSource ? {source: testSource.replace(customGitString, '')} : prevTestSource ? {source: ''} : {};
};

const dummySecret = '******';

export const getSourceFormValues = (entityDetails: any, testSources: SourceWithRepository[]) => {
  const {content} = entityDetails;

  if (entityDetails.source) {
    const sourceDetails = testSources.find(source => source.name === entityDetails.source);

    return {
      source: entityDetails.source,
      branch: sourceDetails?.repository.branch,
      path: sourceDetails?.repository.path,
    };
  }

  if (content.type === 'string') {
    return {
      source: content.type,
      string: content.data,
    };
  }

  const secrets: {token?: string; username?: string} = {};

  if (content?.repository?.tokenSecret?.name) {
    secrets.token = dummySecret;
  }

  if (content?.repository?.usernameSecret?.name) {
    secrets.username = dummySecret;
  }

  return {
    source: content.type,
    ...content.repository,
    ...secrets,
  };
};

export const getSourceFieldValue = (getFieldValue: (name: NamePath) => any) => {
  const testSourceValue: string = getFieldValue('testSource');

  if (!testSourceValue) {
    return '';
  }

  return testSourceValue.includes(customGitString) ? 'custom' : testSourceValue;
};
