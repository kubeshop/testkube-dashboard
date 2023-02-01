import {Rule} from 'antd/lib/form';

export type Option = {
  value: string | number;
  label: string;
  key?: string;
};

export type FormItem = {
  itemLabel?: string;
  tooltip?: string;
  fieldName: string;
  inputType: 'select' | 'radio' | 'default' | 'uploadWithInput' | 'textarea' | 'variables';
  rules?: Rule[];
  options?: Option[];
  modificator?: 'password';
  help?: string;
  placeholder?: string;
  required?: boolean;
};
