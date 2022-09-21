import {SecretRef} from './secretRef';

export type VariableType = {};

export type Variable = {
  type: 0 | 1 | 'secretRef' | null;
  key: string;
  value: string;
  name?: string;
  secretRef?: SecretRef;
};

export type Variables = Record<string, Variable>;
