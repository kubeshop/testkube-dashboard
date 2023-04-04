import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

interface CreateValidatorOptions<T extends boolean> {
  name: string;
  async?: T;
  validate: (value: any, args: ValidationArguments) => (T extends true ? Promise<boolean> : boolean);
  message: string | ((args?: ValidationArguments) => string);
}

export const createValidator = <T extends boolean>(options: CreateValidatorOptions<T>) => {
  const getDefaultMessage = typeof options.message === 'function'
    ? options.message
    : (...args: any) => (options.message as string);

  @ValidatorConstraint({name: options.name, async: options.async || false})
  class CustomValidator implements ValidatorConstraintInterface {
    // eslint-disable-next-line class-methods-use-this
    validate(value: any, args: ValidationArguments) {
      return options.validate(value, args);
    }

    // eslint-disable-next-line class-methods-use-this
    defaultMessage(validationArguments?: ValidationArguments): string {
      return getDefaultMessage(validationArguments);
    }
  }

  return (validationOptions?: ValidationOptions): PropertyDecorator => (object: Object, property: string | symbol) => {
    registerDecorator({
      target: object.constructor,
      propertyName: property as string,
      options: validationOptions,
      constraints: [],
      validator: CustomValidator,
    });
  };
};
