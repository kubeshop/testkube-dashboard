import {Expose} from 'class-transformer';
import {MaxLength, ValidationOptions} from 'class-validator';

import {KubernetesResourceName} from '@validators/k8s';
import {NonEmptyString} from '@validators/string';
import {EnhancedValidationOptions, ExtraDecorators, createValidator} from '@validators/utils';

export const ExecutorName = createValidator({
  async: true,
  name: 'executorName',
  message: 'Unknown executor.',
  validate: async (name, {signal}) => {
    const available = await fetch('https://dev.testkube.io/results/v1/executors', {signal}).then(x => x.json());
    return available.some((x: any) => x.name === name);
  },
});

const timeout = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

// TODO: Opaque time for the Custom Validator
export const Debounce = (validator: (options: ValidationOptions) => PropertyDecorator, ms: number) => {
  return (options: ValidationOptions) => {
    validator({
      ...options,
      context: {
        ...options.context,
        [ExtraDecorators]: [
          ...(options.context?.ExtraDecorators || []),
          (value: any, args: any, next: any) => {
            console.log('Waiting', ms, 'milliseconds');
            return timeout(ms).then(() => next(value, args));
          },
        ],
      },
    });
  };
};

export class CreateExecutorDto {
  @Expose()
  @NonEmptyString()
  @MaxLength(63)
  @KubernetesResourceName()
  public name = '';

  @Expose()
  @NonEmptyString()
  @ExecutorName({debounce: 500, context: {warning: true}})
  public type = '';

  @Expose()
  @NonEmptyString()
  public image = '';
}
