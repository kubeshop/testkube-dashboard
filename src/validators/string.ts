import {Transform} from 'class-transformer';
import {MinLength} from 'class-validator';

export const NonEmptyString = (): PropertyDecorator => (target, propertyKey) => {
  Transform(({value}) => value || '')(target, propertyKey);
  MinLength(1, {message: 'Required.'})(target, propertyKey);
};
