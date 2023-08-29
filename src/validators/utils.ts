import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  getMetadataStorage,
  registerDecorator,
} from 'class-validator';
import {ValidationMetadata} from 'class-validator/types/metadata/ValidationMetadata';
import {ConstraintMetadata} from 'class-validator/types/metadata/ConstraintMetadata';

export interface EnhancedValidationOptions extends ValidationOptions {
  debounce?: number;
  warning?: boolean;
}

export interface EnhancedValidationArguments extends ValidationArguments {
  signal: AbortSignal;
}

export const ExtraDecorators = Symbol('extra decorators lsit');

interface CreateValidatorOptions<T extends boolean> {
  name: string;
  async?: T;
  validate: (value: any, args: EnhancedValidationArguments) => T extends true ? Promise<boolean> : boolean;
  message: string | ((args?: ValidationArguments) => string);
}

const timeout = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

export const createValidator = <T extends boolean>(options: CreateValidatorOptions<T>) => {
  const getDefaultMessage =
    typeof options.message === 'function' ? options.message : () => options.message as string;

  const CustomValidator = class implements ValidatorConstraintInterface {
    abortController = new AbortController();

    // eslint-disable-next-line class-methods-use-this
    validate(value: any, args: ValidationArguments) {
      // eslint-disable-next-line
      console.log('CCCC', this, arguments);
      this.abortController.abort();
      this.abortController = new AbortController();
      const signal = this.abortController.signal;

      const debounce = args.constraints.find(x => x.debounce != null)?.debounce;
      const call = () => {
        if (signal.aborted) {
          return false;
        }
        return options.validate(value, {...args, signal});
      };

      return debounce ? timeout(debounce).then(call) : call();
    }

    // eslint-disable-next-line class-methods-use-this
    defaultMessage(validationArguments?: ValidationArguments): string {
      return getDefaultMessage(validationArguments);
    }
  }

  ValidatorConstraint({name: options.name, async: options.async || false})(CustomValidator);

  return (validationOptions?: EnhancedValidationOptions): PropertyDecorator =>
    (object: Object, property: string | symbol) => {
      registerDecorator({
        target: object.constructor,
        propertyName: property as string,
        options: validationOptions,
        constraints: [
          {debounce: validationOptions?.debounce ?? (options.async ? 1 : 0)},
          {warning: validationOptions?.warning},
        ],
        validator: CustomValidator,
      });
    };
};

export const getAsyncValidatedProperties = (ValidatorClass: Function): Set<string> => {
  const metadata = getMetadataStorage() as any as {
    validationMetadatas: Map<Function, ValidationMetadata[]>;
    constraintMetadatas: Map<Function, ConstraintMetadata[]>;
  };
  const validation = metadata.validationMetadatas.get(ValidatorClass);
  const constraints = metadata.constraintMetadatas;
  return new Set((validation || [])
    .filter(v => constraints.get(v.constraintCls)!.some(c => c.async))
    .map(v => v.propertyName));
};

export const hasAsyncValidations = (ValidatorClass: Function): boolean => {
  const metadata = getMetadataStorage() as any as {
    validationMetadatas: Map<Function, ValidationMetadata[]>;
    constraintMetadatas: Map<Function, ConstraintMetadata[]>;
  };
  const validation = metadata.validationMetadatas.get(ValidatorClass);
  const constraints = metadata.constraintMetadatas;
  return Boolean(validation?.some(v => constraints.get(v.constraintCls)!.some(c => c.async)));
};
