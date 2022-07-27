import {FormItem} from '@models/form';
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

export const addTestFormStructure: FormItem[] = [
  {
    tooltip: 'Enter the name of the test you wish to add.',
    rules: [required],
    fieldName: 'name',
    inputType: 'default',
    placeholder: 'Name',
  },
  {
    tooltip:
      'Tests are single executor orientated objects. Tests can have different types, depending on which executors are installed in your cluster. If you don’t see your type listed, you may add your own executor.',
    fieldName: 'testType',
    inputType: 'select',
    rules: [required],
    options: [
      {
        value: 'curl/test',
        label: 'Curl',
      },
      {
        value: 'cypress/project',
        label: 'Cypress',
      },
      {
        value: 'k6/script',
        label: 'K6',
      },
      {
        value: 'postman/collection',
        label: 'Postman',
      },
      {
        value: 'soapui/xml',
        label: 'SoapUI',
      },
      {
        value: 'artillery/test',
        label: 'Artillery',
      },
    ],
    placeholder: 'Type',
  },
  {
    tooltip:
      'Tests can be added from two sources: A simple file with the test content e.g. Postman collection JSON file Git - the repository, path and branch of where tests are stored.',
    rules: [required],
    fieldName: 'testSource',
    inputType: 'select',
    options: [
      {value: 'git-dir', label: 'Git directory'},
      {value: 'git-file', label: 'Git file'},
      {value: 'file-uri', label: 'File'},
      {value: 'string', label: 'String'},
    ],
    placeholder: 'Source',
  },
];

export const gitDirFormFields: FormItem[] = [
  {
    tooltip: 'If required by your repository enter your Personal Access Token (PAT). ',
    fieldName: 'token',
    inputType: 'default',
    modificator: 'password',
    placeholder: 'Token',
  },
  {
    rules: [required, url],
    fieldName: 'uri',
    inputType: 'default',
    placeholder: 'URI',
  },
  {
    tooltip: 'We’ve entered a default of main, however you can specify any branch.',
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
    tooltip: 'If required by your repository enter your Personal Access Token (PAT). ',
    fieldName: 'token',
    inputType: 'default',
    modificator: 'password',
    placeholder: 'Token',
  },
  {
    rules: [required, url],
    fieldName: 'uri',
    inputType: 'default',
    placeholder: 'URI',
  },
  {
    tooltip: 'We’ve entered a default of main, however you can specify any branch.',
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

export const getTestSourceSpecificFields = (values: any) => {
  const {testSource} = values;

  if (testSource === 'string' || testSource === 'file-uri') {
    return {data: values.string || values.file.fileContent};
  }

  if (testSource === 'git-file') {
    return {
      repository: {
        type: testSource,
        uri: values.uri,
        ...(values.token ? {token: values.token} : {}),
        ...(values.branch ? {branch: values.branch} : {}),
      },
    };
  }

  return {
    repository: {
      type: testSource,
      uri: values.uri,
      path: values.path,
      ...(values.branch ? {branch: values.branch} : {}),
      ...(values.token ? {token: values.token} : {}),
    },
  };
};
