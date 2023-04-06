import {Rule} from 'antd/lib/form';

import {k8sResourceNameRegex} from '@utils/strings';

export const required: Rule = {required: true, message: 'Required.'};
export const digits: Rule = {pattern: /\d/, message: 'Only digits.'};
export const requiredNoText: Rule = {required: true, message: ''};
export const k8sResourceNamePattern: Rule = {
  pattern: k8sResourceNameRegex,
  message: `
Name must must only consist of lower case alphanumeric characters, '-' or '.', and must start and end with an alphanumeric character`,
};
export const k8sResourceNameMaxLength: Rule = {max: 63, message: 'Max length 63 symbols'};
export const url: Rule = {type: 'url'};
export const duplicateKeyMessage = 'Duplicate key.';
