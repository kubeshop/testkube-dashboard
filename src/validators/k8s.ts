import {Transform} from 'class-transformer';

import {createValidator} from './utils';

const resourceRegex = /^(|[a-z0-9]([-.a-z0-9]*[a-z0-9])?)$/;

const ValidateKubernetesResourceName = createValidator({
  name: 'kubernetesResourceName',
  message: 'It should be valid Kubernetes resource name.',
  validate: value => resourceRegex.test(value),
});

// TODO: Check why it's not replacing onBlur
export const KubernetesResourceName = (): PropertyDecorator => (target, propertyKey) => {
  Transform(({value}) => (value || '').replace(/(.)([A-Z])([A-Z]*)/g, (_: string, $1: string, $2: string, $3: string) => `${$1}-${$2}${$3}`).toLowerCase())(target, propertyKey);
  ValidateKubernetesResourceName()(target, propertyKey);
};
