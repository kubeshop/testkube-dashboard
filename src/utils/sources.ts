import {Option} from '@models/form';
import {SourceWithRepository} from '@models/sources';

export const remapTestSources = (testSources: SourceWithRepository[]) => {
  if (!testSources || !testSources.length) {
    return [];
  }

  const array: Option[] = [];

  testSources.forEach(source => {
    const {name} = source;

    const optionValue = `$custom-git-dir-${name}`;
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
