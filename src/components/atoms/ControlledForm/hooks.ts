import {useEffect, useMemo} from 'react';
import {useAsyncFn, useMountedState} from 'react-use';

import {Form, FormInstance, FormProps} from 'antd';

import {instanceToPlain, plainToInstance} from 'class-transformer';
import {ValidationError, validate, validateSync} from 'class-validator';
import {get as getDeep, isEqual, set} from 'lodash';

import {useLastCallback} from '@hooks/useLastCallback';

import {getAsyncValidatedProperties} from '@validators/utils';

import {getRcFormFields, setRcFormFields, useRcFormFields} from './rcForm';
import {findValidationError} from './utils';

type Value = Record<string, any>;
type Class<T extends Value> = {new (...args: any): T};
type ChangeCallback<T extends Value> = (value: T, prevValue: T) => void;
type SubmitCallback<T extends Value> = (value: T, errors: ValidationError[]) => void;

interface ControlledFormOptions {
  dependencies?: any[];
  validateAsyncImmediately?: boolean;
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
// TODO: Consider excludeExtraneousValues: true
export const useControlledForm = <T extends Value>(
  ValidatorClass: Class<T>,
  rawValue: T = {} as T,
  options: ControlledFormOptions = {}
): ControlledFormData<T> => {
  const [form] = Form.useForm<T>();
  const [raw] = useRcFormFields(form);
  const {dependencies = [], validateAsyncImmediately = false} = options;

  // Check if there is asynchronous behavior
  // TODO: Handle nested async validations
  const asyncFields = useMemo(() => getAsyncValidatedProperties(ValidatorClass), [ValidatorClass]);
  const isAsync = asyncFields.size > 0;

  // Store sanitized value
  const value = useMemo(() => plainToInstance(ValidatorClass, rawValue), [rawValue, ValidatorClass, ...dependencies]);

  // Store the latest errors
  const errors = useMemo(() => validateSync(value), [value]);

  // Handle the async validation
  const isMounted = useMountedState();
  const [{value: asyncErrors, loading: asyncValidating}, runAsyncValidation] = useAsyncFn(
    () => (isAsync ? validate(value) : Promise.resolve([])),
    [value, ValidatorClass]
  );
  console.log(asyncErrors);
  useMemo(() => {
    if (validateAsyncImmediately || isMounted()) {
      runAsyncValidation();
    }
  }, [value]);

  // Validate the form using class-validator
  useEffect(() => {
    const combinedErrors = [...errors, ...(asyncValidating ? [] : asyncErrors || [])];
    const fields = raw.map(field => {
      const error = findValidationError(combinedErrors, field.name);
      const fieldValue = getDeep(value, field.name);

      const messages = (field.touched || fieldValue) && error ? Object.entries(error.constraints || {}) : [];
      const warnings = messages.filter(([k, v]) => error?.contexts?.[k]?.warning);
      const errs = messages.filter(x => !warnings.includes(x));

      return {
        ...field,
        // TODO: Handle nested async validations
        validating:
          asyncValidating && asyncFields.has((Array.isArray(field.name) ? field.name[0] : field.name) as string),
        value: fieldValue,
        warnings: errs.length > 0 ? [] : warnings.map(([_, v]) => v),
        errors: errs.map(([_, v]) => v),
      };
    });
    setRcFormFields(form, fields);
  }, [raw, value, asyncErrors]);

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
  const onValuesChange = useLastCallback(() => {
    if (changeListeners.length > 0) {
      const nextValue = instanceToPlain(value);
      getRcFormFields(form).forEach(field => {
        set(nextValue, Array.isArray(field.name) ? field.name : [field.name], field.value);
      });
      const sanitizedValue = plainToInstance(ValidatorClass, nextValue);
      changeListeners.forEach(fn => fn(sanitizedValue, value));
    }
  });

  const onSubmit = useLastCallback(() => {
    submitListeners.forEach(fn => fn(value, errors));
  });

  // Build rest of props for form
  const formProps = {
    form,
    onValuesChange,
    onFinish: onSubmit,
    onFinishFailed: onSubmit,
  };

  return {form, errors, value, useChange, useSubmit, formProps};
};
