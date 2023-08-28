import {ReactElement} from 'react';

import {Form, FormProps} from 'antd';

import {ValidationError} from 'class-validator';

import {useControlledForm} from './hooks';

type Value = Record<string, any>;
type Validator<T> = {new (...args: any): T};

export interface ControlledFormProps<T extends Value, U extends Validator<T>>
  extends Omit<FormProps, 'onValuesChange' | 'initialValues' | 'form' | 'onChange' | 'onFinish' | 'onFinishFailed'> {
  value?: T;
  virtual?: boolean;
  Validator: U;
  onChange?: (value: T, prevValue: T) => void;
  onSubmit?: (value: T, errors: ValidationError[]) => void;
  children?: ReactElement | ReactElement[];
}

export const ControlledForm = <T extends Value, U extends Validator<T>>({
  value,
  Validator,
  onChange,
  onSubmit,
  virtual,
  ...rest
}: ControlledFormProps<T, U>): ReactElement => {
  const {formProps, useChange, useSubmit} = useControlledForm(Validator, value);

  useChange(onChange);
  useSubmit(onSubmit);

  const component = rest.component || (virtual ? 'div' : undefined);

  return <Form {...rest} component={component} {...formProps} />;
};
