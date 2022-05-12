import {Rule} from 'antd/lib/form';

const requiredField: Rule = {required: true, message: 'This field is required'};
const url: Rule = {type: 'url'};

type Option = {
  value: string;
  label: string;
};

type FormItem = {
  itemLabel: string;
  tooltip?: string;
  fieldName: string;
  inputType: 'select' | 'radio' | 'default' | 'uploadWithInput' | 'textarea';
  rules?: Array<Rule>;
  options?: Array<Option>;
  modificator?: 'password';
  help?: string;
};

export const formStructure: Array<FormItem> = [
  {
    itemLabel: 'Name',
    tooltip: 'Enter the name of the test you wish to add.',
    rules: [requiredField],
    fieldName: 'name',
    inputType: 'default',
    help: 'Example: test-script-git',
  },
  {
    itemLabel: 'Type',
    tooltip:
      'Tests are single executor orientated objects. Tests can have different types, depending on which executors are installed in your cluster. If you don’t see your type listed, you may add your own executor.',
    fieldName: 'testType',
    inputType: 'select',
    rules: [requiredField],
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
    ],
  },
  {
    itemLabel: 'Test source',
    tooltip:
      'Tests can be added from two sources: A simple file with the test content e.g. Postman collection JSON file Git - the repository, path and branch of where tests are stored.',
    rules: [requiredField],
    fieldName: 'testSource',
    inputType: 'radio',
    options: [
      {value: 'git-dir', label: 'Git directory'},
      {value: 'git-file', label: 'Git file'},
      {value: 'file-uri', label: 'File'},
      {value: 'string', label: 'String'},
    ],
  },
];

export const gitDirFormFields: Array<FormItem> = [
  {
    itemLabel: 'Personal Access Token',
    tooltip: 'If required by your repository enter your Personal Access Token (PAT). ',
    fieldName: 'token',
    inputType: 'default',
    modificator: 'password',
  },
  {
    itemLabel: 'Git URI',
    rules: [requiredField, url],
    fieldName: 'uri',
    inputType: 'default',
    help: 'Example: https://github.com/kubeshop/testkube-example.git',
  },
  {
    itemLabel: 'Branch Specifier',
    tooltip: 'We’ve entered a default of main, however you can specify any branch.',
    fieldName: 'branch',
    inputType: 'default',
  },
  {
    itemLabel: 'Repository Path',
    rules: [requiredField],
    fieldName: 'path',
    inputType: 'default',
    help: 'Example: test-directory',
  },
];

export const gitFileFormFields: Array<FormItem> = [
  {
    itemLabel: 'Personal Access Token',
    tooltip: 'If required by your repository enter your Personal Access Token (PAT). ',
    fieldName: 'token',
    inputType: 'default',
    modificator: 'password',
  },
  {
    itemLabel: 'Git URI',
    rules: [requiredField, url],
    fieldName: 'uri',
    inputType: 'default',
    help: 'Example: https://github.com/kubeshop/testkube-example.git',
  },
  {
    itemLabel: 'Branch Specifier',
    tooltip: 'We’ve entered a default of main, however you can specify any branch.',
    fieldName: 'branch',
    inputType: 'default',
  },
];

export const fileContentFormFields: Array<FormItem> = [
  {
    itemLabel: 'Select file',
    rules: [requiredField],
    fieldName: 'file',
    inputType: 'uploadWithInput',
  },
];

export const stringContentFormFields: Array<FormItem> = [
  {
    itemLabel: 'String content',
    rules: [requiredField],
    fieldName: 'string',
    inputType: 'textarea',
  },
];
