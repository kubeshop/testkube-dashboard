import {useEffect, useMemo, useRef} from 'react';
import {Form, FormInstance, FormProps} from 'antd';
import {instanceToPlain, plainToInstance} from 'class-transformer';
import {validateSync, ValidationError} from 'class-validator';
import {get as getDeep, isEqual, set} from 'lodash';

import {useLatestCallback} from '@hooks/useLatestCallback';

import {getRcFormFields, useRcFormFields} from './rcForm';
import {findValidationError} from './utils';

type Value = Record<string, any>;
type Class<T extends Value> = { new(...args: any): T };
type ChangeCallback<T extends Value> = (value: T, prevValue: T) => void;
type SubmitCallback<T extends Value> = (value: T, errors: ValidationError[]) => void;

interface ControlledFormOptions {
  dependencies?: any[];
}

interface ControlledFormData<T extends Value> {
  form: FormInstance<T>;
  errors: ValidationError[];
  value: T;
  useChange: (fn?: ChangeCallback<T>) => void;
  useSubmit: (fn?: SubmitCallback<T>) => void;
  formProps: Pick<FormProps<T>, 'form' | 'onValuesChange' | 'onFinish' | 'onFinishFailed'>;
}

// TODO: Support custom validation functions?
// TODO: Support async validation
// TODO: Consider excludeExtraneousValues: true
export const useControlledForm = <T extends Value>(
  ValidatorClass: Class<T>,
  rawValue: T = {} as T,
  options: ControlledFormOptions = {},
): ControlledFormData<T> => {
  const [form] = Form.useForm<T>();
  const [raw] = useRcFormFields(form);
  const {dependencies = []} = options;

  // Store sanitized value
  const value = useMemo(
    () => plainToInstance(ValidatorClass, rawValue),
    [rawValue, ValidatorClass, ...dependencies],
  );

  // Store the latest errors
  const errors = useRef<ValidationError[]>([]);
  useEffect(() => {
    errors.current = validateSync(value);
  }, [value]);

  // Validate the form using class-validator
  useEffect(() => {
    const fields = raw.map((field) => {
      const error = findValidationError(errors.current, field.name);
      const fieldValue = getDeep(value, field.name);
      return {
        ...field,
        value: fieldValue,
        warnings: [],
        errors: (field.touched || fieldValue) && error ? [Object.values(error.constraints || {})[0] || 'Invalid.'] : [],
      };
    });

    if (!isEqual(fields, raw)) {
      form.setFields(fields);
    }
  }, [raw, value]);

  // Callback helpers
  const changeListeners: ChangeCallback<T>[] = [];
  const useChange = (fn?: ChangeCallback<T>): void => {
    if (fn) {
      changeListeners.push(fn);
    }
  };

  const submitListeners: SubmitCallback<T>[] = [];
  const useSubmit = (fn?: SubmitCallback<T>): void => {
    if (fn) {
      submitListeners.push(fn);
    }
  };

  // Build callbacks
  const onValuesChange = useLatestCallback(() => {
    if (changeListeners.length > 0) {
      const nextValue = instanceToPlain(value);
      getRcFormFields(form).forEach((field) => {
        set(nextValue, Array.isArray(field.name) ? field.name : [field.name], field.value);
      });
      const sanitizedValue = plainToInstance(ValidatorClass, nextValue);
      changeListeners.forEach((fn) => fn(sanitizedValue, value));
    }
  });

  const onSubmit = useLatestCallback(() => {
    submitListeners.forEach((fn) => fn(value, errors.current));
  });

  // Build rest of props for form
  const formProps = {
    form,
    onValuesChange,
    onFinish: onSubmit,
    onFinishFailed: onSubmit,
  };

  return {form, errors: errors.current, value, useChange, useSubmit, formProps};
};
