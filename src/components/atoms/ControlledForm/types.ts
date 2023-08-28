import {FormProps} from 'antd';

export type FieldData = FormProps extends {fields?: (infer F)[]} ? F : never;

export type NamePath = string | number | (string | number)[];
