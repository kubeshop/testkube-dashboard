import {useEffect, useRef, useState} from 'react';

import {FormInstance} from 'antd';

import {isEqual} from 'lodash';

import {useLastCallback} from '@hooks/useLastCallback';

import {FieldData, NamePath} from './types';

const HOOK_MARK = 'RC_FORM_INTERNAL_HOOKS';

export const getRcFormInternalHooks = (form: FormInstance) => (form as any).getInternalHooks(HOOK_MARK);
export const getRcFormFields = (form: FormInstance): FieldData[] => getRcFormInternalHooks(form).getFields();

export const useRcFormWatch = <T>(form: FormInstance<T>, fn: (values: T, namePath?: NamePath) => void): void => {
  const callback = useLastCallback(fn);
  const unsubscribe = useRef<() => void>(() => {});

  useEffect(() => {
    unsubscribe.current = getRcFormInternalHooks(form).registerWatch(callback);
    return () => unsubscribe.current();
  }, [form]);
};

export const useRcFormFields = (form: FormInstance): [FieldData[]] => {
  const [fields, setFields] = useState<FieldData[]>(() => getRcFormFields(form));

  const update = () => {
    const newFields = getRcFormFields(form);
    if (!isEqual(newFields, fields)) {
      setFields(newFields);
    }
  };

  useEffect(update);
  useRcFormWatch(form, update);

  return [fields];
};

export const setRcFormFields = (form: FormInstance, newFields: FieldData[]): void => {
  const prevFields = getRcFormFields(form);
  if (isEqual(prevFields, newFields)) {
    return;
  }

  // FIXME: "Warning: There may be circular references" logged.
  //        The rc-field-form's Field initially has *.errors === *.warnings,
  //        causing that error.
  //        _this.errors = EMPTY_ERRORS;
  //        _this.warnings = EMPTY_ERRORS;
  form.setFields(newFields);
};
