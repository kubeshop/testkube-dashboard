import {Executor} from '@models/executors';
import {FormItem, Option} from '@models/form';
import {SourceWithRepository} from '@models/sources';
import {Step} from '@models/wizard';

import {required, url} from '@utils/form';

import FirstStepHint from './hints/FirstStepHint';
import SecondStepHint from './hints/SecondStepHint';
import ThirdStepHint from './hints/ThirdStepHint';

export const addTestSteps: Step[] = [
  {title: 'Test Details', description: 'Enter test information.'},
  {title: 'Add Variables', description: 'Reuse values.'},
  {title: 'Done', description: 'Save or run your test.'},
];

export const addTestHints = [FirstStepHint, SecondStepHint, ThirdStepHint];

export const addTestFormStructure = (options: Option[], customTestSources: Option[] = []) => [
  {
    // tooltip: 'Enter the name of the test you wish to add.',
    rules: [required],
    fieldName: 'name',
    inputType: 'default',
    placeholder: 'Name',
    itemLabel: 'Name',
    required: true,
  },
  {
    dataTest: 'test-creation_label_option',
    inputType: 'labels',
    itemLabel: 'Labels',
  },
  {
    // tooltip: 'Tests are single executor orientated objects. Tests can have different types, depending on which executors are installed in your cluster. If you don’t see your type listed, you may add your own executor.',
    fieldName: 'testType',
    inputType: 'select',
    rules: [required],
    options,
    placeholder: 'Type',
    itemLabel: 'Type',
    required: true,
  },
  {
    // tooltip: 'Tests can be added from two sources: A simple file with the test content e.g. Postman collection JSON file Git - the repository, path and branch of where tests are stored.',
    rules: [required],
    fieldName: 'testSource',
    inputType: 'select',
    options: [
      ...customTestSources,
      {value: 'git-dir', label: 'Git directory'},
      {value: 'git-file', label: 'Git file'},
      {value: 'file-uri', label: 'File'},
      {value: 'string', label: 'String'},
    ],
    placeholder: 'Source',
    dataTest: 'test-creation_type_source_option',
    itemLabel: 'Test Source',
    required: true,
  },
];

export const gitDirFormFields: FormItem[] = [
  {
    // tooltip: 'If required by your repository enter your Personal Access Token (PAT). ',
    fieldName: 'token',
    inputType: 'default',
    modificator: 'password',
    placeholder: 'Git Token',
    itemLabel: ' ',
  },
  {
    // tooltip: 'If required by your repository enter your Personal Access Token (PAT). ',
    fieldName: 'username',
    inputType: 'default',
    placeholder: 'Git Username',
    itemLabel: ' ',
  },
  {
    rules: [required, url],
    fieldName: 'uri',
    inputType: 'default',
    placeholder: 'URI',
  },
  {
    // tooltip: 'We’ve entered a default of main, however you can specify any branch.',
    fieldName: 'branch',
    inputType: 'default',
    placeholder: 'Branch',
  },
  {
    fieldName: 'path',
    inputType: 'default',
    placeholder: 'Path',
  },
];

export const gitFileFormFields: FormItem[] = [
  {
    // tooltip: 'If required by your repository enter your Personal Access Token (PAT). ',
    fieldName: 'token',
    inputType: 'default',
    modificator: 'password',
    placeholder: 'Git Token',
    itemLabel: ' ',
  },
  {
    // tooltip: 'If required by your repository enter your Personal Access Token (PAT). ',
    fieldName: 'username',
    inputType: 'default',
    placeholder: 'Git Username',
    itemLabel: ' ',
  },
  {
    rules: [required, url],
    fieldName: 'uri',
    inputType: 'default',
    placeholder: 'URI',
  },
  {
    // tooltip: 'We’ve entered a default of main, however you can specify any branch.',
    fieldName: 'branch',
    inputType: 'default',
    placeholder: 'Branch',
  },
  {
    fieldName: 'path',
    inputType: 'default',
    placeholder: 'Path',
  },
];

export const fileContentFormFields: FormItem[] = [
  {
    rules: [required],
    fieldName: 'file',
    inputType: 'uploadWithInput',
    placeholder: 'File',
  },
];

export const customTypeFormFields: FormItem[] = [
  {
    // tooltip: 'We’ve entered a default of main, however you can specify any branch.',
    fieldName: 'branch',
    inputType: 'default',
    placeholder: 'Branch',
  },
  {
    fieldName: 'path',
    inputType: 'default',
    placeholder: 'Path',
  },
];

export const stringContentFormFields: FormItem[] = [
  {
    rules: [required],
    fieldName: 'string',
    inputType: 'textarea',
    placeholder: 'String',
  },
];

export const secondStepFormFields: FormItem[] = [
  {
    rules: [required],
    fieldName: 'variables',
    inputType: 'variables',
  },
];

export const optionalFields = ['token', 'branch', 'path'];

export const getTestSourceSpecificFields = (
  values: any,
  isTestSourceCustomGitDir?: boolean,
  customTestSources?: SourceWithRepository[]
) => {
  const {testSource} = values;

  if (isTestSourceCustomGitDir && customTestSources && customTestSources.length) {
    const targetCustomTestSource = customTestSources.filter(source => {
      return source.name === testSource.replace('custom-git-dir-', '');
    })[0];

    return {
      repository: {
        type: 'git-dir',
        uri: targetCustomTestSource.repository.uri,
        ...(values.path ? {path: values.path} : {}),
        ...(values.branch ? {branch: values.branch} : {}),
        ...(targetCustomTestSource.repository.tokenSecret?.name
          ? {token: targetCustomTestSource.repository.tokenSecret?.name}
          : {}),
        ...(targetCustomTestSource.repository.usernameSecret?.name
          ? {username: targetCustomTestSource.repository.usernameSecret?.name}
          : {}),
      },
    };
  }

  if (testSource === 'string' || testSource === 'file-uri') {
    return {data: values.string || values.file.fileContent};
  }

  return {
    repository: {
      type: testSource,
      uri: values.uri,
      ...(values.path ? {path: values.path} : {}),
      ...(values.branch ? {branch: values.branch} : {}),
      ...(values.token ? {token: values.token} : {}),
      ...(values.username ? {username: values.username} : {}),
    },
  };
};

export const remapExecutors = (executors: Executor[]) => {
  if (!executors || !executors.length) {
    return [];
  }

  const array: Option[] = [];

  executors.forEach(executorItem => {
    const {
      executor: {types},
    } = executorItem;

    types.forEach(type => {
      array.push({label: type, value: type});
    });
  });

  return array;
};

export const remapTestSources = (testSources: SourceWithRepository[]) => {
  if (!testSources || !testSources.length) {
    return [];
  }

  const array: Option[] = [];

  testSources.forEach(source => {
    const {name} = source;

    const optionValue = `custom-git-dir-${name}`;
    const optionName = `Git source: ${name}`;

    array.push({value: optionValue, label: optionName});
  });

  return array;
};
